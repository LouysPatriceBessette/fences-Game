// pages/index.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setChatMessage, toggleCurrentPlayer, setUsedFences, setFencedByP1 } from '../store/actions';
import { useChatMessages } from '../store/selectors';

let socket;

export default function Socket() {
  const [messageInput, setMessageInput] = useState('');

  const dispatch = useDispatch();
  const messages = useChatMessages();

  useEffect(() => {
    const socketInitializer = async () => {
      // await fetch('/api/socket'); // This is a placeholder to ensure the server is ready, not a direct WebSocket connection
      socket = io(); // Connect to the WebSocket server

      socket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });

      socket.on('message', (msg) => {

        let command
        try{
          command = JSON.parse(msg)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch(error){
          // Nothing to do...
        }

        if(command){
          console.log(command)
          switch(command.type){
            case 'set-size':
              dispatch(setSize(command.payload))
              break;

            // {"type":"toggle-current-player"}
            case 'toggle-current-player':
              dispatch(toggleCurrentPlayer())
              break;
              
            // {"type":"move", "move":"V-2"}
            case 'move':
              dispatch(setUsedFences(command.move))
              break;
          }
        }else{
          dispatch(setChatMessage(msg));
        }
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });
    };

    socketInitializer();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = () => {
    console.log('sendMessage', socket && messageInput)
    if (socket && messageInput) {
      socket.emit('message', messageInput);
      setMessageInput('');
    }
  };

  return (
    <>
      <h1 style={{textAlign: 'center'}}>Real-time Chat</h1>
      <div style={{width: '50%', margin: '0 auto 1em auto', border: '1px solid black', padding: '1em', backgroundColor: 'lightgrey', maxHeight: '8em', overflowY: 'scroll'}}>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4em'}}>
        
        <input
          style={{ border: '1px solid grey', borderRadius: '4px', marginRight: '1em'}}
          type="text"
          value={messageInput}
          onKeyUp={(event) => {
            console.log(event.key)
            if(event.key === 'Enter') {
              sendMessage();
            }
          }}
          onChange={(event) => {
            setMessageInput(event.target.value)
          }}
        />
        <button onClick={sendMessage} style={{border: '1px solid grey', borderRadius: '4px', cornerShape: 'squircle', padding: '0 0.5em'}}>Send</button>
      </div>
    </>
  );
}