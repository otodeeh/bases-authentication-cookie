import fastifyCookie from '@fastify/cookie';
import { FastifyInstance } from 'fastify';

export function configureCookies(fastify: FastifyInstance) {
  fastify.register(fastifyCookie);
}
