  // pages/index.js
  import { useEffect, useState } from 'react';
  import io from 'socket.io-client';

  let socket;

  export default function Socket() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      const socketInitializer = async () => {
        // await fetch('/api/socket'); // This is a placeholder to ensure the server is ready, not a direct WebSocket connection
        socket = io(); // Connect to the WebSocket server

        socket.on('connect', () => {
          console.log('Connected to WebSocket server');
        });

        socket.on('message', (msg) => {
          setMessages((prevMessages) => [...prevMessages, msg]);
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
    }, []);

    const sendMessage = () => {
      if (socket && message) {
        socket.emit('message', message);
        setMessage('');
      }
    };

    return (
      <div>
        <h1>Real-time Chat</h1>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    );
  }