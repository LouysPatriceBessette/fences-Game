import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import {
  setGameId,
  setIamPlayer,
  setSocketInstance,
  setSocketLocalId,
  setLocalPlayerName,
  setChatMessage,
  refreshReduxStore,
  setRemoteIsOnline,
  setRemotePlayerName,
} from './store/actions';

import { Socket } from 'socket.io-client';
import { SOCKET_ACTIONS } from './basics/constants';
import { tryParseJson } from './basics/utils';

export const socketKill = (socket: Socket) => {
  socket.disconnect();
}

export const sendMessage = (socket: Socket, gameId: number, message: string, setMessageInput: React.Dispatch<React.SetStateAction<string>>) => {
  if (socket && gameId !== -1 && message) {
    socket.emit('message', JSON.stringify({from: 'chat', to: 'chat', gameId, message}));
    setMessageInput('');
  }
};

export const SocketListen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let socket: Socket;
    try{
      socket = io();
    } catch(error){
      console.error('WebSocket instanciation error:', error);
      return;
    }

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      dispatch(setSocketInstance(socket))
      dispatch(setSocketLocalId(socket.id ?? ''))
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server', reason);
    });

    socket.on('message', (msg) => {
      const command = tryParseJson(msg)

      if(command){
        console.log('command received', command)

        if(command.from === 'server'){
          switch(command.action){

            case SOCKET_ACTIONS.HELLO:
              const savedSocketId = localStorage.getItem('socketId') ?? ''
              const gameId = localStorage.getItem('gameId') ?? ''

              const reply = {
                from: 'player',
                to: 'server',
                action: SOCKET_ACTIONS.REFRESH_ID,
                gameId: gameId,
                oldSocketId: savedSocketId,
                newSocketId: command.socketId,
              }
              socket.emit('message', JSON.stringify(reply))

              localStorage.setItem('socketId', command.socketId)
              break;

            case SOCKET_ACTIONS.CREATED_GAME:
              dispatch(setGameId(command.gameId))
              localStorage.setItem('gameId', command.gameId)
              break;

            // Player 1
            case SOCKET_ACTIONS.PLAYER_JOINED_MY_GAME:
              dispatch(setRemoteIsOnline(true))
              dispatch(setRemotePlayerName(command.player2Name))
              break;
              
            // Player 2
            case SOCKET_ACTIONS.CONNECTED_TO_A_GAME:
              dispatch(setRemoteIsOnline(true))
              dispatch(setGameId(command.gameId))
              dispatch(setIamPlayer(2))
              dispatch(setRemotePlayerName(command.player1Name))
              localStorage.setItem('gameId', command.gameId)
              break;
            
            case SOCKET_ACTIONS.JOIN_FAILED:
              alert('Game does not exist')
              dispatch(setGameId(-1))
              localStorage.removeItem('gameId')
              break;

            case SOCKET_ACTIONS.PREVIOUS_GAME_DELETED:
              dispatch(setGameId(-1))
              localStorage.removeItem('gameId')
              // alert('The game you were in has been deleted from the server.')
              break;

            case SOCKET_ACTIONS.PING:
              socket.emit('message', JSON.stringify({
                from: 'player',
                to: 'server',
                action: SOCKET_ACTIONS.PONG,
                gameId: command.gameId,
                iamPlayerId: socket.id,
              }))
              break;

            case SOCKET_ACTIONS.PONG:
              dispatch(setRemoteIsOnline(command.isOnline))
              break;

            // Refresh redux (like on page reload) - Ifs are in case the game does not exist on server
            case SOCKET_ACTIONS.SOCKET_ID_REFRESHED:
              if(command.redux) dispatch(refreshReduxStore(command.redux))
              dispatch(setIamPlayer(command.youArePlayer))
              if(command.youArePlayer === 1){
                dispatch(setLocalPlayerName(command.playerNames[0]))
                dispatch(setRemotePlayerName(command.playerNames[1]))
              } else {
                dispatch(setLocalPlayerName(command.playerNames[1]))
                dispatch(setRemotePlayerName(command.playerNames[0]))
              }
              break;

            case SOCKET_ACTIONS.OTHER_PLAYER_DISCONNECTED: 
              dispatch(setRemoteIsOnline(false))
              break;
          }
        }

        if(command.from === 'player' && command.to === 'player'){
          switch(command.action){

            case SOCKET_ACTIONS.UPDATE_OTHER_PLAYER_REDUX:
              dispatch(refreshReduxStore(command.redux))
              break;

            
          }
        }

        if(command.from === 'chat'){
          dispatch(setChatMessage(command.message))
        }
      } else {
        console.log('Received a string message:', msg);
      }
    });

    socket.on('error', (err) => {
      console.error(`Socket.IO connection error: ${err.message}`);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div></div>
}