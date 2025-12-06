import dotenv from 'dotenv';
dotenv.config();

console.log(`=============================\n=== ${process.env.NODE_ENV}\n=============================\n\n`)


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
      size: {x: 3, y: 3},
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

const getGameById = (gameId) => {
  if(!gameId){
    console.log(headerWrap('getGameById', 'No gameId provided.'))
    return
  }
  if(isNaN(gameId)){
    console.log(headerWrap('getGameById', `GameId '${gameId}' is not a number.`))
    return
  }
  
  return games.find((game) => game.id === gameId)
}

const getGameByPlayerId = (playerId) => {
  if(!playerId){
    console.log(headerWrap('getGameByPlayerId', 'No PlayerId provided.'))
    return
  }
  
  return games.find((game) => game.players.includes(playerId))
}

const getGameIndex = (gameId) => {
  if(!gameId){
    console.log(headerWrap('getGameIndex', 'No gameId provided.'))
    return
  }
  if(isNaN(gameId)){
    console.log(headerWrap('getGameIndex', `GameId '${gameId}' is not a number.`))
    return
  }
  
  return games.findIndex((g) => g.id === gameId)
}

const getOtherPlayerId = (gameId, playerId) => {
  const game = getGameById(parseInt(gameId))
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
        const game = getGameById(parseInt(parsed.gameId))
        if(!game){
          console.log(headerWrap('Game not found for chat message', msg))
          return
        } else {
          console.log(headerWrap(`> Message to chat`, msg))


          // Keep game messages
          const game = getGameById(parsed.gameId)
          const gameIndex = getGameIndex(game.id)

          game.redux.chat.messages.push(parsed.message)
          games[gameIndex] = game

          // Send the message to both players
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
                    const gameIndexToUpdate = getGameIndex(game.id)
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
                  currentGame = getGameById(parseInt(parsed.gameId))
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
                  if(parsed.gameId !== -1 && parsed.gameId !== ''){
                    io.to(parsed.newSocketId).emit('message', JSON.stringify({
                      from: 'server',
                      to: 'player',
                      action: SOCKET_ACTIONS.PREVIOUS_GAME_DELETED,
                    }))
                  }
                }
              } else {
                if(parsed.gameId !== -1 && parsed.gameId !== ''){
                  io.to(parsed.newSocketId).emit('message', JSON.stringify({
                    from: 'server',
                    to: 'player',
                    action: SOCKET_ACTIONS.PREVIOUS_GAME_DELETED,
                  }))
                }
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
                players: [parsed.socketId, 'FREE'],
                player1Name: parsed.player1Name,
                redux: {
                  ...INITIAL_GAME_STATE.redux,
                  game: {
                    ...INITIAL_GAME_STATE.redux.game,
                    size: parsed.size,
                  }
                }
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
                const game = getGameById(parseInt(parsed.gameId))

                if(game){

                  // Check if one of the players left
                  let freeSeat
                  if(game.players.includes('FREE')) {
                    freeSeat = ['A', 'B'][game.players.indexOf('FREE')]  // A or B
                  }

                  if(!freeSeat){
                    io.to(parsed.socketId).emit('message', JSON.stringify({
                      from: 'server',
                      to: 'player',
                      action: SOCKET_ACTIONS.GAME_FULL,
                    }))
                    return
                  }

                  // Normal join
                  let ownerId = game.players[0]
                  let joinerId = parsed.socketId
                  
                  // IsPlayer (1 or 2)
                  let ownerSeat = 'A'
                  let joinerSeat = 'B'

                  // If the joiner join a started game AND replaces the original player1
                  if(freeSeat === 'A'){
                    ownerId = game.players[1]

                    joinerSeat = 'A'
                    ownerSeat = 'B'

                    game.player1Name = parsed.newPlayerName
                    game.player2Name = game.player1Name
                  } else {
                    // game.players.push(parsed.socketId)
                    game.player2Name = parsed.newPlayerName
                  }

                  game.players[freeSeat === 'A' ? 0 : 1] = parsed.socketId

                  // Update games
                  const gameToUpdate = getGameIndex(parseInt(parsed.gameId))
                  games[gameToUpdate] = game

                  console.log(`${LOG_COLORS.INFO}> Player joined game ${game.id}${LOG_COLORS.WHITE}`, game)

                  // Confirm join
                  io.to(joinerId).emit('message', JSON.stringify({
                    from: 'server',
                    to: 'player',
                    action: SOCKET_ACTIONS.JOINED_A_GAME,
                    gameId: game.id,
                    player1Name: game.player1Name,
                    player2Name: game.player2Name,
                    youArePlayer: joinerSeat === 'A' ? 1 : 2,
                    currentPlayer: game.currentPlayer,
                    redux: game.redux,
                  }))

                  // Notify owner
                  io.to(ownerId).emit('message', JSON.stringify({
                    from: 'server',
                    to: 'player',
                    action: SOCKET_ACTIONS.PLAYER_JOINED_MY_GAME,
                    player1Name: game.player1Name,
                    player2Name: game.player2Name,
                    youArePlayer: ownerSeat === 'A' ? 1 : 2,
                    currentPlayer: game.currentPlayer,
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
              const gameToLeave = getGameById(parseInt(parsed.gameId))
              if(!gameToLeave || parsed.gameId === -1 || parsed.gameId === ''){
                console.log(`${LOG_COLORS.WARNING}> Game not found${LOG_COLORS.WHITE}`, gameToLeave)
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

              const gameHasAlreadyOnePlayerLeft = gameToLeave.players.indexOf('FREE') !== -1
              if(gameHasAlreadyOnePlayerLeft){
                console.log(`${LOG_COLORS.WARNING}> Game ${gameToLeave.id} should be destroyed instead${LOG_COLORS.WHITE}`, gameToLeave)
                return
              }

              // Leaving...
              const leavingPlayer = parsed.socketId
              const leavingPlayerIs = gameToLeave.players.indexOf(parsed.socketId)
              const otherPlayerId = getOtherPlayerId(gameToLeave.id, parsed.socketId)
 
              // Replace the leaving player id with a placeholder in the game players array
              gameToLeave.players[leavingPlayerIs] = 'FREE'

              // Update the games
              const gameIndex = getGameIndex(gameToLeave.id)
              games[gameIndex] = gameToLeave

              console.log('games after update', games)

              // Messages
              const messageToLeavingPlayer = {
                from: 'server',
                to: 'player',
                action: SOCKET_ACTIONS.I_LEFT_THE_GAME,
                leavingPlayer: leavingPlayerIs + 1
              }
              console.log('messageToLeavingPlayer', messageToLeavingPlayer)
              io.to(leavingPlayer).emit('message', JSON.stringify(messageToLeavingPlayer))
              

              const messageToOtherPlayer = {
                from: 'server',
                to: 'player',
                action: SOCKET_ACTIONS.PLAYER_LEFT_MY_GAME,
                leavingPlayer: leavingPlayerIs + 1,
              }
              console.log('messageToOtherPlayer', messageToOtherPlayer)
              io.to(otherPlayerId).emit('message', JSON.stringify(messageToOtherPlayer))

              break;

            case SOCKET_ACTIONS.DESTROY_GAME:
              const gameToDestroy = getGameById(parseInt(parsed.gameId))

              const requestToDestroyComesFromPlayer = gameToDestroy.players.indexOf(parsed.socketId) !== -1
              if(!requestToDestroyComesFromPlayer){
                console.log(`${LOG_COLORS.WARNING}> Attempt to destroy game ${gameToDestroy.id} from a non-player${LOG_COLORS.WHITE}`, gameToDestroy)
                return
              }

              if(gameToDestroy.players.indexOf('FREE') === -1){
                console.log(`${LOG_COLORS.WARNING}> Cannot destroy game ${gameToDestroy.id}${LOG_COLORS.WHITE}`, gameToDestroy)
                return
              }

              if(gameToDestroy){
                const gameIndex = getGameIndex(gameToDestroy.id)
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
                const game = getGameById(parsed.gameId)

                if(game){
                  game.redux = parsed.redux

                  // Update games
                  const gameIndex = getGameIndex(game.id)
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
      }
    });


    //
    // =========================================================== DISCONNECT
    //
    socket.on('disconnect', () => {
      console.log(`${LOG_COLORS.INFO}> User disconnected ${socket.id}${LOG_COLORS.WHITE}`);
      
      const game = getGameByPlayerId(socket.id)
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