import { routeAdapter } from '@/infrastructure/plugins/http/fastify';
import { HealthController } from '@/presentation/controllers/generics/health-controller';
import { FastifyTypedInstance } from 'fastify';
import z from 'zod';

export function healthRoutes(app: FastifyTypedInstance) {
  app.get('/health-check', {
    schema: {
      tags: ['generics'],
      description: 'Server health',
      response: {
        200: z.object({
          status: z.string()
        }),
      },
    },
    handler: routeAdapter(new HealthController()),
  });
}
