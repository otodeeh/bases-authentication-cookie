import { AuthLogoutUseCase } from "@/application/use-cases/auth";
import { prismaClient, RefreshTokenRepository } from "@/infrastructure/database/prisma";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols/controller";

export class AuthLogoutController implements Controller {
    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            if (!request?.cookies?.refreshToken) return { statusCode: 400, body: 'RefreshToken not found' }
            const { refreshToken } = request?.cookies;
            const tokenRepo = new RefreshTokenRepository(prismaClient);
            const authLogoutUseCase = new AuthLogoutUseCase(tokenRepo);
            await authLogoutUseCase.execute(refreshToken);

            return { 
                statusCode: 204,
                cookies: { logout: true },
                body: "Logout success"
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