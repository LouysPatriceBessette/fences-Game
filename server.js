import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const tryParseJson = (string) => {
  let json
  try{
    json = JSON.parse(string)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch(error){
    json = null
  }

  return json
}

const randomGameId = () => {
  const number = Math.floor(Math.random() * 1000000)

  // Check if already exist
  if(games.find(game => game.id === number)) {
    return randomGameId()
  } else {
    return number
  }
}

// While we do not have a DB yet...
const games = []

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res); // Let Next.js handle regular requests
  });

  const io = new Server(httpServer, {
    cors: {
      origin: '*', // Adjust for your client-side origin in production
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send a hello message - The player may refresh its socket id.
    const hello = {
      from: 'server',
      action: 'hello',
      socketId: socket.id,
    }
    socket.emit('message', JSON.stringify(hello));


    //
    // MESSAGES
    //
    socket.on('message', (msg) => {

      // Attempt to parse the message
      const parsed = tryParseJson(msg)

      // Messages to server
      if(parsed && parsed.to === 'server') {
        console.log('Message to server', msg)

        // TODO: SHOULD update the other player too! Take it from the game.
        //

        // REFRESH SOCKET ID
        if(games.length && parsed.action === 'refresh-id' && parsed.oldSocketId && parsed.newSocketId){
          
          // The use is to resync with a game
          const userGames = games.filter((game) => game.players.includes(parsed.oldSocketId))

          if(userGames) {
            userGames.forEach((game) => {
              game.players[game.players.indexOf(parsed.oldSocketId)] = parsed.newSocketId
            })
          }

          let currentGame
          if(parsed.gameId){
            currentGame = games.find((game) => game.id === parseInt(parsed.gameId))
          }
          io.to(parsed.newSocketId).emit('message', JSON.stringify({
            from: 'server',
            action: 'socket-id-refreshed',
            redux: currentGame.redux,
          }))
        }

        // CREATE GAME
        if(parsed.action === 'create-game'){
          const game = {
            id: randomGameId(),
            players: [parsed.socketId],
          }
          games.push(game)
          console.log(`player1 created game ${game.id}`, game)

          io.to(parsed.socketId).emit('message', JSON.stringify({
            from: 'server',
            action: 'created-game',
            gameId: game.id,
          }))
        }

        // JOIN GAME
        if(parsed.action === 'join-game' && parsed.gameId && parsed.socketId){
          const game = games.find((game) => game.id === parseInt(parsed.gameId))

          if(game){

            const player1 = game.players[0]
            const player2 = parsed.socketId

            game.players.push(player2)
            console.log(`player2 joined game ${game.id}`, game)

            // Confirm join to player2
            io.to(player2).emit('message', JSON.stringify({
              from: 'server',
              action: 'connected-to-a-game',
              gameId: game.id,
              otherPlayer: player1,
            }))

            // Notify player1
            io.to(player1).emit('message', JSON.stringify({
              from: 'server',
              action: 'player-joined-my-game',
              otherPlayer: player2,
            }))
          } else {

            // TODO: Not implemented in frontend yet.
            console.log(`player2 failed to join game ${parsed.gameId}`)
            io.to(parsed.socketId).emit('message', JSON.stringify({
              to: 'player',
              action: 'join-failed',
            }))
          }
        }
      }

      // Message to a specific player
      else if(parsed && parsed.to === 'player' && parsed.localPlayerId && parsed.remotePlayerId) {
        console.log('Message to a specific player', msg)

        // Keep a redux copy of the game
        if(parsed.action === 'update-other-player-redux' && parsed.gameId){
          const game = games.find((game) =>
            game.players.includes(parsed.localPlayerId) &&
            game.players.includes(parsed.localPlayerId) &&
            game.id === parsed.gameId)

          if(game){
            game.redux = parsed.redux

            // Update games
            const gameIndex = games.findIndex((g) => g.id === game.id)
            games[gameIndex] = game

            // Send to the other player
            io.to(parsed.remotePlayerId).emit('message', msg)
          }
        }
        // TODO:
        // else... Like if the other player quit the game... This would stay silent.
      }

      // Message to players of a specific game
      else if(parsed && parsed.to === 'players' && parsed.gameId) {
        const game = games.find((game) => game.id === parsed.gameId)
        console.log('Message to players of a specific game', msg)
        for(const player of game.players){
          io.to(player).emit('message', msg)
        }
      }
      
      // Messages to anyone ??
      else {
        console.log('Message to anyone?:', msg);
        io.emit('message', msg);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);

      // TODO: Notify the other player... Online status!!
    });
  });

  httpServer.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});