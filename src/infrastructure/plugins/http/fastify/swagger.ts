import { env } from '@/main/config';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyTypedInstance } from 'fastify';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export async function configureSwagger(app: FastifyTypedInstance) {
  if (env.isProduction) return

  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'App 2.0 Prática API',
        description: 'Backend do App 2.0 Prática',
        version: process.env.npm_package_version || '1.0.0',
      }
    },
    transform: jsonSchemaTransform,
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: '/api/docs',
  });
}
