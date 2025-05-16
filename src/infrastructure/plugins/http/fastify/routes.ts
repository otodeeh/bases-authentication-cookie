import { authRoutes, healthRoutes, userRoutes } from '@/presentation/routes';
import { FastifyInstance } from 'fastify';
import { routeAdapter } from './routeAdapter';

export function registerRoutes(app: FastifyInstance) {
  app.register(healthRoutes, { ...routeAdapter });
  app.register(userRoutes, { prefix: '/users', ...routeAdapter });
  app.register(authRoutes, { prefix: '/auth', ...routeAdapter });
}
