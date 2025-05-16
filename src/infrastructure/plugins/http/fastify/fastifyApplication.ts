import { registerPrisma } from '@/infrastructure/plugins/database';
import { loggerMiddleware } from '@/infrastructure/plugins/http/middlewares';
import { registerZodValidation } from '@/infrastructure/plugins/validation';
import { env } from '@/main/config';
import fastify, { FastifyInstance } from "fastify";
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { configureCookies } from './cookies';
import { configureCors } from './cors';
import { registerRoutes } from './routes';
import { configureSwagger } from './swagger';

export class FastifyApplication {
    public app: FastifyInstance;

    constructor () {
        this.app = fastify({ logger: { level: env.fastify.logLevel } }).withTypeProvider<ZodTypeProvider>();
        this.middlewares();
        this.routes();
    }

    middlewares () {
        this.app.addHook('preHandler', loggerMiddleware);
        configureCookies(this.app);
        configureCors(this.app);
        configureSwagger(this.app);
        registerZodValidation(this.app);
        registerPrisma(this.app);
    }

    routes () {
        this.app.register(registerRoutes, { prefix: '/api' });
    }
}

