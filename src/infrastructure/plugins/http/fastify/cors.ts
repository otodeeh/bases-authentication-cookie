import { fastifyCors } from '@fastify/cors';
import { FastifyInstance } from 'fastify';

export function configureCors(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  });
}
