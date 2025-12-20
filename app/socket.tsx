import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import {
  resetReduxInitialState,
  setClientsCount,
  setGameId,
  setIamPlayer,
  setSocketInstance,
  setSocketLocalId,
  setNameOfPlayer1,
  setChatMessage,
  refreshReduxStore,
  setRemoteIsOnline,
  setRemoteHasLeft,
  setNameOfPlayer2,
  toggleCurrentPlayer,
  setAnotherGameCreated,
  setGameIdChanged,
} from './store/actions';

import { useLanguage } from './store/selectors';

import { Socket } from 'socket.io-client';
import { SOCKET_ACTIONS } from './basics/constants';
import { tryParseJson } from './basics/utils';

// Translations
import t from "./translations";
import { SupportedLanguagesType } from "./translations/supportedLanguages";

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
  const DEBUG_PING_PONG = Boolean(Number(process.env.NEXT_PUBLIC_DEBUG_PING_PONG))

  const dispatch = useDispatch()
  const language: SupportedLanguagesType = useLanguage()

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
        if(DEBUG_PING_PONG){
          console.log('command received', command)
        }

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
              localStorage.setItem('LastGameNumberUsed', command.gameId)
              break;

            // Player 1
            case SOCKET_ACTIONS.PLAYER_JOINED_MY_GAME:
              dispatch(setRemoteIsOnline(true))
              dispatch(setRemoteHasLeft(false))
              
              dispatch(setIamPlayer(command.youArePlayer))
              dispatch(toggleCurrentPlayer(command.currentPlayer))

              dispatch(setNameOfPlayer1(command.player1Name))
              dispatch(setNameOfPlayer2(command.player2Name))
              
              dispatch(refreshReduxStore(command.redux))
              break;
              
            // Player 2
            case SOCKET_ACTIONS.JOINED_A_GAME:
              dispatch(setRemoteIsOnline(true))
              dispatch(setRemoteHasLeft(false))
              dispatch(setGameId(command.gameId))
              localStorage.setItem('gameId', command.gameId)

              dispatch(setIamPlayer(command.youArePlayer))
              dispatch(toggleCurrentPlayer(command.currentPlayer))
              
              dispatch(setNameOfPlayer1(command.player1Name))
              dispatch(setNameOfPlayer2(command.player2Name))

              dispatch(refreshReduxStore(command.redux))
              break;
            
            case SOCKET_ACTIONS.JOIN_FAILED:
              alert(t[language]['Game does not exist'])
              dispatch(setGameId(-1))
              localStorage.removeItem('gameId')
              break;

            case SOCKET_ACTIONS.PREVIOUS_GAME_DELETED:
              dispatch(setGameId(-1))
              localStorage.removeItem('gameId')
              alert(t[language]['This game was deleted'])
              break;

            case SOCKET_ACTIONS.PLAYER_LEFT_MY_GAME:
              dispatch(setRemoteIsOnline(false))
              dispatch(setRemoteHasLeft(true))
              if(command.leavingPlayer === 1) {
                dispatch(setNameOfPlayer1(`${command.leavingPlayerName} ${t[language]['left...']}`))
              }else{
                dispatch(setNameOfPlayer2(`${command.leavingPlayerName} ${t[language]['left...']}`))
              }
              break;

            case SOCKET_ACTIONS.I_LEFT_THE_GAME:
              dispatch(resetReduxInitialState())
              localStorage.removeItem('gameId')

              setTimeout(()=> {
                dispatch(toggleCurrentPlayer(1))
                dispatch(setNameOfPlayer1(localStorage.getItem('myName') ?? `${t[language]['Player']} 1`))
                dispatch(setNameOfPlayer2(`${t[language]['Player']} 2`))
              },1)
              break;
            
            case SOCKET_ACTIONS.GAME_DESTROYED:
              dispatch(resetReduxInitialState())
              localStorage.removeItem('gameId')

              setTimeout(()=> {
                dispatch(setNameOfPlayer1(localStorage.getItem('myName') ?? `${t[language]['Player']} 1`))
              },1)
              break;
            
            case SOCKET_ACTIONS.PING:
              dispatch(setClientsCount(command.clientsCount))

              if(DEBUG_PING_PONG){
                console.log("Received PING", command)
              }
              const pongMsg = {
                from: 'player',
                to: 'server',
                action: SOCKET_ACTIONS.PONG,
                gameId: localStorage.getItem('gameId'),
                iamPlayerId: socket.id,
              }

              if(DEBUG_PING_PONG){
                console.log("Sending PONG to server", pongMsg)
              }

              socket.emit('message', JSON.stringify(pongMsg))
              break;

            case SOCKET_ACTIONS.PONG:
              if(DEBUG_PING_PONG){
                console.log("Received PONG (other player is online)", command)
              }
              dispatch(setRemoteIsOnline(command.isOnline))
              break;

            // Refresh redux (like on page reload) - Ifs are in case the game does not exist on server
            case SOCKET_ACTIONS.SOCKET_ID_REFRESHED:
              if(command.redux) dispatch(refreshReduxStore(command.redux))
              dispatch(setIamPlayer(command.youArePlayer))
              if(command.youArePlayer === 1){
                dispatch(setNameOfPlayer1(command.playerNames[0]))
                dispatch(setNameOfPlayer2(command.playerNames[1]))
              } else {
                dispatch(setNameOfPlayer1(command.playerNames[1]))
                dispatch(setNameOfPlayer2(command.playerNames[0]))
              }
              break;

            case SOCKET_ACTIONS.OTHER_PLAYER_DISCONNECTED: 
              dispatch(setRemoteIsOnline(false))
              break;

            case SOCKET_ACTIONS.ANOTHER_GAME_WAS_CREATED:
              dispatch(setAnotherGameCreated(command.gameId))
              localStorage.setItem('gameId', command.gameId)
              if(command.closeDialog){
                dispatch(setGameIdChanged(true))
              }
              break;

            default:
              console.log('Unknown server action:', command.action);
              break;
          }
        }

        if(command.from === 'player' && command.to === 'player'){
          switch(command.action){

            case SOCKET_ACTIONS.UPDATE_OTHER_PLAYER_REDUX:
              dispatch(refreshReduxStore(command.redux))
              break;

            default:
              console.log('Unknown player-to-player action:', command.action);
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
   
  }, [language, dispatch, DEBUG_PING_PONG]);

  return <div></div>
}