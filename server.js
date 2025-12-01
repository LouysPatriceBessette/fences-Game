import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';
import {
  LOG_COLORS,
  headerWrap,
  SOCKET_ACTIONS,
} from './app/basics/constants.js';
import {
  tryParseJson,
  randomGameId,
} from './app/basics/utils.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

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
    console.log(`${LOG_COLORS.INFO}> A user connected: ${socket.id}${LOG_COLORS.WHITE}`);

    //
    // ===========================================================  CONNECT
    //
    const hello = {
      from: 'server',
      to: 'player',
      action: SOCKET_ACTIONS.HELLO,
      socketId: socket.id,
    }
    socket.emit('message', JSON.stringify(hello));


    //
    // ===========================================================  MESSAGES
    //
    socket.on('message', (msg) => {

      // Attempt to parse the message
      const parsed = tryParseJson(msg)
      
      if(!parsed){
        console.log(headerWrap('Message to anyone?', msg));
      }

      //
      // =========================================================== CHAT MESSAGES
      //
      else if(parsed.to === 'chat' && parsed.gameId) {
        const game = games.find((game) => game.id === parseInt(parsed.gameId))
        if(!game){
          console.log(headerWrap('Game not found for chat message', msg))
          return
        } else {
          console.log(headerWrap(`> Message to chat`, msg))
          const players = game.players;
          players.forEach((playerId) => {
            io.to(playerId).emit('message', msg);
          });
        }
      }

      //
      // =========================================================== GAME MESSAGES
      //
      else {
        if(parsed.to !== 'server' && parsed.to !== 'player' && parsed.to !== 'chat') {
          console.log(headerWrap('Not a valid message', msg))
          return
        }

        if(parsed.to === 'server') {
          console.log(headerWrap(`> Message to server`, msg))

          switch(parsed.action){
            case SOCKET_ACTIONS.REFRESH_ID:

              if(games.length && parsed.oldSocketId && parsed.newSocketId){
                // The use is to resync with a game
                const userGames = games.filter((game) => game.players.includes(parsed.oldSocketId))

                const otherPlayersToNotify = {}
                if(userGames) {
                  userGames.forEach((game) => {
                    const indexToReplace = game.players.indexOf(parsed.oldSocketId)
                    const otherPlayerId = game.players[indexToReplace === 0 ? 1 : 0]

                    // Replace the ID
                    game.players[indexToReplace] = parsed.newSocketId

                    // Get the other player(s)
                    otherPlayersToNotify[otherPlayerId] = true
                  })

                  // Notify the other player(s)
                  Object.keys(otherPlayersToNotify).forEach((otherPlayerId) => {
                    io.to(otherPlayerId).emit('message', JSON.stringify({
                      from: 'server',
                      to: 'player',
                      action: SOCKET_ACTIONS.REMOTE_SOCKET_ID_REFRESHED,
                      newRemoteSocketId: parsed.newSocketId
                    }))
                  })
                }

                let currentGame
                if(parsed.gameId){
                  currentGame = games.find((game) => game.id === parseInt(parsed.gameId))
                }
                if(currentGame){
                  io.to(parsed.newSocketId).emit('message', JSON.stringify({
                    from: 'server',
                    to: 'player',
                    action: SOCKET_ACTIONS.LOCAL_SOCKET_ID_REFRESHED,
                    ...currentGame && {redux: currentGame.redux},
                    ...currentGame && {youArePlayer: currentGame.players.indexOf(parsed.newSocketId) + 1},
                  }))
                } else {
                  io.to(parsed.newSocketId).emit('message', JSON.stringify({
                    from: 'server',
                    to: 'player',
                    action: SOCKET_ACTIONS.PREVIOUS_GAME_DELETED,
                  }))
                }
              } else {
                  io.to(parsed.newSocketId).emit('message', JSON.stringify({
                    from: 'server',
                    to: 'player',
                    action: SOCKET_ACTIONS.PREVIOUS_GAME_DELETED,
                  }))
                }
              break;

            case SOCKET_ACTIONS.CREATE_GAME:
              const game = {
                id: randomGameId(games),
                players: [parsed.socketId],
              }
              games.push(game)
              console.log(`${LOG_COLORS.INFO}> player1 created game ${game.id}${LOG_COLORS.WHITE}`, game)

              io.to(parsed.socketId).emit('message', JSON.stringify({
                from: 'server',
                to: 'player',
                action: SOCKET_ACTIONS.CREATED_GAME,
                gameId: game.id,
              }))
              break;

            case SOCKET_ACTIONS.JOIN_GAME:
              if(parsed.gameId && parsed.socketId){
                const game = games.find((game) => game.id === parseInt(parsed.gameId))

                if(game){

                  const player1 = game.players[0]
                  const player2 = parsed.socketId

                  game.players.push(player2)
                  console.log(`${LOG_COLORS.INFO}> Player2 joined game ${game.id}${LOG_COLORS.WHITE}`, game)

                  // Confirm join to player2
                  io.to(player2).emit('message', JSON.stringify({
                    from: 'server',
                    to: 'player',
                    action: SOCKET_ACTIONS.CONNECTED_TO_A_GAME,
                    gameId: game.id,
                    otherPlayer: player1,
                  }))

                  // Notify player1
                  io.to(player1).emit('message', JSON.stringify({
                    from: 'server',
                    to: 'player',
                    action: SOCKET_ACTIONS.PLAYER_JOINED_MY_GAME,
                    otherPlayer: player2,
                  }))
                } else {

                  // TODO: Not implemented in frontend yet.
                  console.log(`${LOG_COLORS.WARNING}> Failed to join game ${LOG_COLORS.ERROR}${parsed.gameId}${LOG_COLORS.RESET}`)
                  io.to(parsed.socketId).emit('message', JSON.stringify({
                    from: 'server',
                    to: 'player',
                    action: SOCKET_ACTIONS.JOIN_FAILED,
                  }))
                }
              }
              break;

            default:
              console.log(`${LOG_COLORS.WARNING}> Unknown action to server: ${parsed.action}${LOG_COLORS.WHITE}`, parsed)
              break;
          }
        }

        if(parsed.to === 'player') {
          console.log(`${LOG_COLORS.INFO}> Message to a specific player${LOG_COLORS.WHITE}`, msg)

          switch(parsed.action){
            case SOCKET_ACTIONS.UPDATE_OTHER_PLAYER_REDUX:
              if(parsed.gameId){
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
              break;

            default:
              console.log(`${LOG_COLORS.WARNING}> Unknown action to player: ${parsed.action}${LOG_COLORS.WHITE}`, parsed)
              break;
          }
        }

        if(parsed.to === 'chat') {
          console.log(headerWrap(`> Message to chat`, msg))
          io.emit('message', msg);}
      }
    });


    //
    // =========================================================== DISCONNECT
    //
    socket.on('disconnect', () => {
      console.log(`${LOG_COLORS.INFO}> User disconnected ${socket.id}${LOG_COLORS.WHITE}`);

      // TODO: Notify the other player... Online status!!
    });
  });

  httpServer.listen(3000, () => {
    console.log(`\n\n${LOG_COLORS.SUCCESS}> Ready on http://localhost:3000${LOG_COLORS.WHITE}\n\n`);
  });
});