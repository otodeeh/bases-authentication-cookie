import { IRefreshTokenRepository, RevokeAllRefreshTokens } from "@/domain/repositories";

export class AuthLogoutGlobalUseCase {
    constructor (
        private readonly tokenRepo: IRefreshTokenRepository
    ) {}

    async execute (userId: RevokeAllRefreshTokens.Params): Promise<void> {
        await this.tokenRepo.revokeAllRefreshTokens(userId);
    }
}