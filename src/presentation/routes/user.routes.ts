import { routeAdapter } from "@/infrastructure/plugins/http/fastify";
import { AddUserController } from "@/presentation/controllers/users";
import { AddUser } from '@/presentation/schemas/users';
import { FastifyTypedInstance } from "fastify";

export function userRoutes(app: FastifyTypedInstance) {
  app.post('/register', {
    schema: {
        tags: ['user'],
        description: 'Register new user',
        body: AddUser.Body,
        response: {
            200: AddUser.Return,
        },
    },
    handler: routeAdapter(new AddUserController()),
  });
}