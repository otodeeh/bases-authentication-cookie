import { AuthValidateToken, IRefreshTokenRepository } from "@/domain/repositories";
import { JwtAdapter } from "@/infrastructure/adapters";

export class ValidateRefreshTokenUseCase {
    constructor (
        private readonly tokenRepo: IRefreshTokenRepository,
        private readonly jwt: JwtAdapter
    ) { }

    async execute(refreshToken: AuthValidateToken.Params): Promise<AuthValidateToken.Return> {
        const tokenData = await this.tokenRepo.validateRefreshToken(refreshToken);
        if (!tokenData) throw new Error('TokenData not found');

        const { token, expiresAt } = this.jwt.generateRefreshToken();
        const tokenHash = this.jwt.generateHash(token);
        
        const refreshTokenData = {
            userId: tokenData?.id,
            deviceId: tokenData?.deviceId,
            tokenHash,
            expiresAt
        }

        await this.tokenRepo.add(refreshTokenData);
        const accessToken = this.jwt.generateAccessToken(tokenData);
        
        return {
            accessToken,
            refreshToken: tokenHash
        };
    }
}