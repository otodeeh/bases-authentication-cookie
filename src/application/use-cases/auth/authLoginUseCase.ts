import { AuthLogin, IRefreshTokenRepository, IUserRepository } from "@/domain/repositories";
import { BcryptAdapter, JwtAdapter } from "@/infrastructure/adapters";

export class AuthLoginUseCase {
    constructor (
        private readonly userRepo: IUserRepository,
        private readonly tokenRepo: IRefreshTokenRepository,
        private readonly bcrypt: BcryptAdapter,
        private readonly jwt: JwtAdapter
    ) {}

    async execute(params: AuthLogin.Params): Promise<AuthLogin.Return> {
        const { email, deviceId, password } = params;

        const user = await this.userRepo.loadUserByEmail(email);

        if (!user || user?.loginAttempts === 0) return null;

        const isValid = await this.bcrypt.compare(password, user?.password);

        if (!isValid) {
            const loginAttempts = user?.loginAttempts - 1;
            await this.userRepo.updateLoginAttempts(user?.id, loginAttempts);
            return null;
        }
        
        await this.tokenRepo.revokePreviousRefreshTokens({ deviceId, userId: user?.id });

        const { token, expiresAt } = this.jwt.generateRefreshToken();
        const tokenHash = this.jwt.generateHash(token);
        
        const refreshTokenData = {
            userId: user?.id,
            tokenHash,
            expiresAt,
            deviceId
        }

        await this.tokenRepo.add(refreshTokenData);

        const accessToken = this.jwt.generateAccessToken({
            id: user?.id,
            email: user?.email,
            name: user?.name
        });

        return {
            email: user?.email,
            id: user?.id, 
            name: user?.name,
            refreshToken: tokenHash,
            accessToken
        }
    }
}