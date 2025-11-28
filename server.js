import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

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

    socket.on('message', (msg) => {
      console.log('Message received:', msg);
      io.emit('message', msg); // Broadcast to all connected clients
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  httpServer.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});