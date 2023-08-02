import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import path from 'path';
import './socket.mjs'

const server = fastify();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


server.register(fastifyStatic, {
   root: path.join(__dirname, '../client'),
   prefix: '/'
});

server.get('/', (request, reply) => {
   reply.sendFile('index.html');
});


server.listen({ port: 5556 })
   .then(() => {
      console.log('Server started');
   })
   .catch((error) => {
      console.log('Error', error);
   });

