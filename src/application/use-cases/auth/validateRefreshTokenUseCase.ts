import { AuthValidateToken, IRefreshTokenRepository } from "@/domain/repositories";
import { JwtAdapter } from "@/infrastructure/adapters";

export class ValidateRefreshTokenUseCase {
    constructor (
        private readonly tokenRepo: IRefreshTokenRepository,
        private readonly jwt: JwtAdapter
    ) { }

    async execute(refreshToken: AuthValidateToken.Params): Promise<AuthValidateToken.Return> {
        const tokenData = await this.tokenRepo.validateRefreshToken(refreshToken);
        if (!tokenData) return null;
        const accessToken = this.jwt.generateAccessToken(tokenData);
        return accessToken;
    }
}