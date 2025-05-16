import { ValidateRefreshTokenUseCase } from "@/application/use-cases/auth";
import { JwtAdapter } from "@/infrastructure/adapters";
import { prismaClient, RefreshTokenRepository } from "@/infrastructure/database/prisma";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols/controller";

export class ValidateRefreshTokenController implements Controller {
    constructor () { }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            if (!request?.cookies?.refreshToken) {
                return { 
                    statusCode: 404, 
                    body: "RefreshToken not found" 
                } 
            } 

            const { refreshToken } = request.cookies;
            const refreshTokenRepo = new RefreshTokenRepository(prismaClient);
            const jwt = new JwtAdapter();
            const refreshTokenUseCase = new ValidateRefreshTokenUseCase(refreshTokenRepo, jwt);
            const accessToken = await refreshTokenUseCase.execute(refreshToken);

            return {
                statusCode: 200,
                cookies: { refreshToken },
                body: { accessToken }
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