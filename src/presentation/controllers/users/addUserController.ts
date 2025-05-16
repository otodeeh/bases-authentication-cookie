import { AddUserUseCase } from "@/application/use-cases/users";
import { BcryptAdapter } from "@/infrastructure/adapters";
import { prismaClient, UserRepository } from "@/infrastructure/database/prisma";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols/controller";

export class AddUserController implements Controller {
    constructor () {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const data = request.body;
            const addUserRepository = new UserRepository(prismaClient);
            const bcrypt = new BcryptAdapter();
            const addUserUseCase = new AddUserUseCase(bcrypt, addUserRepository);
            const user = await addUserUseCase.execute(data);
            
            return {
                statusCode: 200,
                body: user
            }
        } catch (error) {
            console.error({ error });
            
            return {
                statusCode: 500,
                body: error
            }
        }
    }
}