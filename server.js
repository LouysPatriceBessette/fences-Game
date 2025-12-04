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
const pings = []

const INITIAL_GAME_STATE = {
  id: -1,
  players: [],
  player1Name: '',
  player2Name: '',
  redux: {
    chat: { messages: [] },
    game: {
      // size: 3,
      currentPlayer: 1,
      usedFences: [],
      usedFencesP1: [],
      usedFencesP2: []
    }
  }
}

const pingPongToServerConsole = false

const checkPings = (io, fromPlayerId) => {
  const pingIndex = pings.findIndex((ping) => ping.from === fromPlayerId)
  if(pingIndex !== -1){
    const ping = pings[pingIndex]

    if(pingPongToServerConsole){
      console.log(headerWrap(`> Checking ping from ${fromPlayerId}`, `Ping found: ${JSON.stringify(ping)}`))
    }

    // Notify that the player is offline
    const newMsg = {
      from: 'server',
      to: 'player',
      action: SOCKET_ACTIONS.PONG,
      isOnline: false,
    }

    // Send the message
    io.to(ping.to).emit('message', JSON.stringify(newMsg))

    // Remove the ping from the list
    pings.splice(pingIndex, 1)
  } else {
    if(pingPongToServerConsole){
      console.log(headerWrap(`> Checking ping from ${fromPlayerId}`, `No ping found.`))
    }
  }
}

const clearPingTimeout = (io, fromPlayerId) => {
  const pingIndex = pings.findIndex((ping) => ping.from === fromPlayerId)
  if(pingIndex !== -1){
    clearTimeout(pings[pingIndex].timeoutRef)
    pings.splice(pingIndex, 1)
  }
}

const getOtherPlayerId = (gameId, playerId) => {
  const game = games.find((game) => game.id === parseInt(gameId))
  if(game && game.players.length === 2){
    const indexOfPlayer = game.players.indexOf(playerId)
    return game.players[indexOfPlayer === 0 ? 1 : 0]
  }

  return null
}

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

          if(parsed.action !== SOCKET_ACTIONS.PING && parsed.action !== SOCKET_ACTIONS.PONG){
            
            console.log(headerWrap(`> Message to server`, msg))
            console.log('============ GAMES', games)
            console.log('parsed', parsed)
          }

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
                    if(otherPlayerId){
                      otherPlayersToNotify[otherPlayerId] = true
                    }

                    // Update games
                    const gameIndexToUpdate = games.findIndex((g) => g.id === game.id)
                    games[gameIndexToUpdate] = game
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
                    action: SOCKET_ACTIONS.SOCKET_ID_REFRESHED,
                    redux: currentGame.redux,
                    youArePlayer: currentGame.players.indexOf(parsed.newSocketId) + 1,
                    playerNames: [currentGame.player1Name, currentGame.player2Name],
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

            case SOCKET_ACTIONS.PING:
              if(pingPongToServerConsole){
                console.log('Ping/Pong between players', msg)
              }
              const pingOtherPlayerId = getOtherPlayerId(parsed.gameId, parsed.iamPlayerId)

              if(pingOtherPlayerId){
                const forwardedPing = JSON.stringify({
                  from: 'server',
                  to: 'player',
                  action: SOCKET_ACTIONS.PING,
                  gameId: parsed.gameId,
                })

                pings.push({
                  from: parsed.iamPlayerId,
                  to: pingOtherPlayerId,
                  timeoutRef: setTimeout(() => checkPings(io, parsed.iamPlayerId), 1000),
                })

                io.to(pingOtherPlayerId).emit('message', forwardedPing)

                // Return pong now
              } else {
                const immediateResponse = JSON.stringify({
                  from: 'server',
                  to: 'player',
                  action: SOCKET_ACTIONS.PONG,
                  isOnline: false,
                })

                io.to(parsed.iamPlayerId).emit('message', immediateResponse)
              }
              
              break;

            case SOCKET_ACTIONS.PONG:
              if(pingPongToServerConsole){
                console.log('Ping/Pong between players', msg)
              }
              const pongOtherPlayerId = getOtherPlayerId(parsed.gameId, parsed.iamPlayerId)

              clearPingTimeout(io, pongOtherPlayerId)

              const forwardedPong = JSON.stringify({
                from: 'server',
                to: 'player',
                action: SOCKET_ACTIONS.PONG,
                isOnline: true,
              })

              io.to(pongOtherPlayerId).emit('message', forwardedPong)
              break;

            case SOCKET_ACTIONS.CREATE_GAME:
              const game = {
                ...INITIAL_GAME_STATE,
                id: randomGameId(games),
                players: [parsed.socketId],
                player1Name: parsed.player1Name,
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

                  // Check if one of the players left
                  let freeSeat = ''
                  if(game.players.includes('LEFT_GAME')) {
                    freeSeat = '' + (game.players.indexOf('LEFT_GAME') +1)  // '1' or '2'
                  }

                  let playerAId = game.players[0]
                  let playerBId = parsed.socketId

                  if(Boolean(freeSeat)){
                    if(freeSeat === '1'){
                      playerAId = parsed.socketId
                      playerBId = game.players[1]

                      game.player1Name = parsed.player2Name
                    } else {
                      playerAId = game.players[0]
                      playerBId = parsed.socketId

                      game.player2Name = parsed.player2Name
                    }
                    game.players[Number(freeSeat) - 1] = parsed.socketId

                  } else {
                    game.players.push(parsed.socketId)
                    game.player2Name = parsed.player2Name
                  }

                  // Update games
                  const gameToUpdate = games.findIndex((game) => game.id === parseInt(parsed.gameId))
                  games[gameToUpdate] = game

                  console.log(`${LOG_COLORS.INFO}> Player joined game ${game.id}${LOG_COLORS.WHITE}`, game)

                  let joinerSeat
                  let ownerSeat
                  if(!Boolean(freeSeat)){
                    joinerSeat = 2
                    ownerSeat = 1
                  } else {
                    if(freeSeat === '1'){
                      joinerSeat = 1
                      ownerSeat = 2
                    } else {
                      joinerSeat = 2
                      ownerSeat = 1                      
                    }
                  }

                  // Confirm join
                  io.to(playerBId).emit('message', JSON.stringify({
                    from: 'server',
                    to: 'player',
                    action: SOCKET_ACTIONS.JOINED_A_GAME,
                    gameId: game.id,
                    player1Name: game.player1Name,
                    player2Name: game.player2Name,
                    youArePlayer: joinerSeat
                  }))

                  // Notify owner
                  io.to(playerAId).emit('message', JSON.stringify({
                    from: 'server',
                    to: 'player',
                    action: SOCKET_ACTIONS.PLAYER_JOINED_MY_GAME,
                    player1Name: game.player1Name,
                    player2Name: game.player2Name,
                    youArePlayer: ownerSeat,
                    redux: game.redux,
                  }))
                } else {
                  console.log(`${LOG_COLORS.WARNING}> Failed to join game ${LOG_COLORS.ERROR}${parsed.gameId}${LOG_COLORS.RESET}`)
                  io.to(parsed.socketId).emit('message', JSON.stringify({
                    from: 'server',
                    to: 'player',
                    action: SOCKET_ACTIONS.JOIN_FAILED,
                  }))
                }
              }
              break;

            case SOCKET_ACTIONS.LEAVE_GAME:
              const gameToLeave = games.find((game) => game.id === parseInt(parsed.gameId))
              if(!gameToLeave){
                console.log(`${LOG_COLORS.WARNING}> Game ${gameToLeave.id} not found${LOG_COLORS.WHITE}`, gameToLeave)
                return
              }

              const requestToLeaveComesFromPlayer = gameToLeave.players.indexOf(parsed.socketId) !== -1
              if(!requestToLeaveComesFromPlayer){
                console.log(`${LOG_COLORS.WARNING}> Attempt to destroy game ${gameToLeave.id} from a non-player${LOG_COLORS.WHITE}`, gameToLeave)
                return
              }

              const gameToLeavePlayersCount = gameToLeave.players.length
              if(gameToLeavePlayersCount !== 2){
                console.log(`${LOG_COLORS.WARNING}> Game ${gameToLeave.id} has ${gameToLeavePlayersCount} players...${LOG_COLORS.WHITE}`, gameToLeave)
                return
              }

              const gameHasAlreadyOnePlayerLeft = gameToLeave.players.indexOf('LEFT_GAME') !== -1
              if(gameHasAlreadyOnePlayerLeft){
                console.log(`${LOG_COLORS.WARNING}> Game ${gameToLeave.id} should be destroyed instead${LOG_COLORS.WHITE}`, gameToLeave)
                return
              }

              // Leaving...
              const leavingPlayer = parsed.socketId
              const leavingPlayerIs = gameToLeave.players.indexOf(parsed.socketId)
              const otherPlayerId = getOtherPlayerId(gameToLeave.id, parsed.socketId)
              // const otherPlayerIs = leavingPlayerIs === 0 ? 1 : 0
 
              // Replace the leaving player id with a placeholder in the game players array
              gameToLeave.players[leavingPlayerIs] = 'LEFT_GAME'

              // Update the games
              const gameIndex = games.findIndex((g) => g.id === gameToLeave.id)
              games[gameIndex] = gameToLeave

              console.log('games after update', games)

              // Messages
              const messageToLeavingPlayer = {
                from: 'server',
                to: 'player',
                action: SOCKET_ACTIONS.I_LEFT_THE_GAME,
                // youArePlayer: leavingPlayerIs + 1,
              }
              console.log('messageToLeavingPlayer', messageToLeavingPlayer)
              io.to(leavingPlayer).emit('message', JSON.stringify(messageToLeavingPlayer))
              

              const messageToOtherPlayer = {
                from: 'server',
                to: 'player',
                action: SOCKET_ACTIONS.PLAYER_LEFT_MY_GAME,
                leavingPlayer: leavingPlayerIs + 1,
                // youArePlayer: otherPlayerIs + 1
              }
              console.log('messageToOtherPlayer', messageToOtherPlayer)
              io.to(otherPlayerId).emit('message', JSON.stringify(messageToOtherPlayer))

              break;

            case SOCKET_ACTIONS.DESTROY_GAME:
              const gameToDestroy = games.find((game) => game.id === parseInt(parsed.gameId))

              const requestToDestroyComesFromPlayer = gameToDestroy.players.indexOf(parsed.socketId) !== -1
              if(!requestToDestroyComesFromPlayer){
                console.log(`${LOG_COLORS.WARNING}> Attempt to destroy game ${gameToDestroy.id} from a non-player${LOG_COLORS.WHITE}`, gameToDestroy)
                return
              }

              if(gameToDestroy.players.indexOf('LEFT_GAME') === -1){
                console.log(`${LOG_COLORS.WARNING}> Cannot destroy game ${gameToDestroy.id}${LOG_COLORS.WHITE}`, gameToDestroy)
                return
              }

              if(gameToDestroy){
                const gameIndex = games.findIndex((g) => g.id === gameToDestroy.id)
                games.splice(gameIndex, 1)

                io.to(parsed.socketId).emit('message', JSON.stringify({
                  from: 'server',
                  to: 'player',
                  action: SOCKET_ACTIONS.GAME_DESTROYED,
                }))
              }
              break;

            default:
              console.log(`${LOG_COLORS.WARNING}> Unknown action to server: ${parsed.action}${LOG_COLORS.WHITE}`, parsed)
              break;
          }
        }

        if(parsed.to === 'player') {

          switch(parsed.action){
            case SOCKET_ACTIONS.UPDATE_OTHER_PLAYER_REDUX:
              console.log(headerWrap(`> Update other player's redux`, msg))

              const updateReduxOtherPlayerId = getOtherPlayerId(parsed.gameId, parsed.iamPlayerId)

              if(updateReduxOtherPlayerId){
                const game = games.find((game) => game.id === parsed.gameId)

                if(game){
                  game.redux = parsed.redux

                  // Update games
                  const gameIndex = games.findIndex((g) => g.id === game.id)
                  games[gameIndex] = game

                  // Send to the other player
                  io.to(updateReduxOtherPlayerId).emit('message', msg)
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
          io.emit('message', msg);
        }
      }
    });


    //
    // =========================================================== DISCONNECT
    //
    socket.on('disconnect', () => {
      console.log(`${LOG_COLORS.INFO}> User disconnected ${socket.id}${LOG_COLORS.WHITE}`);
      
      const game = games.find((game) => game.players.includes(socket.id))
      const gameId = game ? game.id : null;

      if(!gameId) return

      const otherPlayerId = getOtherPlayerId(gameId, socket.id)
      const msg = JSON.stringify({
        from: 'server',
        to: 'player',
        action: SOCKET_ACTIONS.OTHER_PLAYER_DISCONNECTED,
      })
      io.to(otherPlayerId).emit('message', (msg))
    });
  });

  httpServer.listen(3000, () => {
    console.log(`\n\n${LOG_COLORS.SUCCESS}> Ready on http://localhost:3000${LOG_COLORS.WHITE}\n\n`);
  });
});