import { AuthLogoutGlobalUseCase } from "@/application/use-cases/auth";
import { prismaClient, RefreshTokenRepository } from "@/infrastructure/database/prisma";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols/controller";

export class AuthLogoutGlobalController implements Controller {
    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { userId } = request.body;
            const tokenRepo = new RefreshTokenRepository(prismaClient);
            const authLogoutGlobalUseCase = new AuthLogoutGlobalUseCase(tokenRepo);
            await authLogoutGlobalUseCase.execute(userId);

            return {
                statusCode: 204,
                cookies: { logout: true },
                body: 'Logout success'
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