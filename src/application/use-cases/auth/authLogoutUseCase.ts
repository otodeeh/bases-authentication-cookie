import { IRefreshTokenRepository, RevokeRefreshToken } from "@/domain/repositories";

export class AuthLogoutUseCase {
    constructor (
        private readonly tokenRepo: IRefreshTokenRepository
    ) {}

    async execute (refreshToken: RevokeRefreshToken.Params): Promise<void> {
        await this.tokenRepo.revokeRefreshToken(refreshToken);
    }
}