import { AuthLoginUseCase } from "@/application/use-cases/auth";
import { BcryptAdapter, JwtAdapter } from "@/infrastructure/adapters";
import { prismaClient, RefreshTokenRepository, UserRepository } from "@/infrastructure/database/prisma";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols/controller";

export class AuthLoginController implements Controller {
    constructor () {}
    
    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const params = request.body;
            const loginUserRepository = new UserRepository(prismaClient);
            const refreshTokenRepository = new RefreshTokenRepository(prismaClient);
            const bcrypt = new BcryptAdapter();
            const jwt = new JwtAdapter();
            const authLoginUseCase = new AuthLoginUseCase(loginUserRepository, refreshTokenRepository, bcrypt, jwt);
            const user = await authLoginUseCase.execute(params);

            if (!user) return { statusCode: 404, body: 'User not found' };

            const { accessToken, refreshToken, ...rest } = user;

            return {
                statusCode: 200,
                cookies: { refreshToken },
                body: { accessToken, ...rest }
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