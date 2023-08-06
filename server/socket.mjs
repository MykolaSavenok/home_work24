import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 5557 });

wss.on('connection', client => {
   console.log('Client connected');
   client.on('message', data => {
      console.log('Got message', data.toString());
      wss.clients.forEach(otherClient => {
            otherClient.send(data.toString());
      })
   });

   client.on('close', () => {
      console.log('Client disconnected');
   });
});
