import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import {
  setGameId,
  setIamPlayer,
  setSocketInstance,
  setSocketLocalId,
  setSocketRemoteId,
  setChatMessage,
  refreshReduxStore,
} from '../store/actions';
import { Socket } from 'socket.io-client';

export const socketKill = (socket: Socket) => {
  socket.disconnect();
}

export const sendMessage = (socket: Socket, messageInput: string, setMessageInput: React.Dispatch<React.SetStateAction<string>>) => {
  if (socket && messageInput) {
    socket.emit('message', messageInput);
    setMessageInput('');
  }
};

export const SocketListen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const socket = io();
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      dispatch(setSocketInstance(socket))
      dispatch(setSocketLocalId(socket.id ?? ''))
    });
  
    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  
    socket.on('message', (msg) => {
      console.log('Message received:', msg);
  
      let command
      try{
        command = JSON.parse(msg)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch(error){
        // Nothing to do...
      }
  
      if(command){
        console.log('command received', command)

        if(command.from === 'server'){
          switch(command.action){

            case 'hello':
              const savedSocketId = localStorage.getItem('socketId') ?? ''
              const gameId = localStorage.getItem('gameId') ?? ''

              const reply = {
                to: 'server',
                action: 'refresh-id',
                gameId: gameId,
                oldSocketId: savedSocketId,
                newSocketId: command.socketId,
              }
              socket.emit('message', JSON.stringify(reply))

              localStorage.setItem('socketId', command.socketId)
              break;

            case 'created-game':
              dispatch(setGameId(command.gameId))
              localStorage.setItem('gameId', command.gameId)
              break;

            // Player 1
            case 'player-joined-my-game':
              dispatch(setSocketRemoteId(command.otherPlayer))
              break;
              
            // Player 2
            case 'connected-to-a-game':
              dispatch(setGameId(command.gameId))
              dispatch(setSocketRemoteId(command.otherPlayer))
              dispatch(setIamPlayer(2))                         // TODO: This is not persistent on page reload...
              localStorage.setItem('gameId', command.gameId)
              break;
            
            // refresh redux (like on page reload)
            case 'socket-id-refreshed':
              dispatch(refreshReduxStore(command.redux))
              break;
          }
        }

        if(command.from !== 'player'){
          switch(command.action){

            case 'update-other-player-redux':
              dispatch(refreshReduxStore(command.redux))
              break;
          }
        }
      }else{
        // Display chat message
        dispatch(setChatMessage(msg));
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return <div></div>
}