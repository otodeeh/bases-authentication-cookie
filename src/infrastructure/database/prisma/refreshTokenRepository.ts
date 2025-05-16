import { AddRefreshToken, IRefreshTokenRepository, RevokeAllRefreshTokens, RevokePreviousRefreshToken, RevokeRefreshToken, ValidateRefreshToken } from "@/domain/repositories/iRefreshTokenRepository";
import { PrismaClient } from "@prisma/client";

export class RefreshTokenRepository implements IRefreshTokenRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async add(params: AddRefreshToken.Params): Promise<any> {
        const { userId, deviceId } = params;

        await this.prisma.refreshToken.updateMany({
            where: { userId, deviceId, revoked: false },
            data: { revoked: true, revokedAt: new Date() }
        });

        await this.prisma.refreshToken.create({
            data: params
        });
    }

    async validateRefreshToken(refreshToken: ValidateRefreshToken.Params): Promise<ValidateRefreshToken.Return> {
        const record = await this.prisma.refreshToken.findFirst({ where: { tokenHash: refreshToken }, include: { user: true } });

        if (!record || record?.revoked || record?.expiresAt < new Date()) {
            return null;
        }

        if (record?.replacedById) {
            await this.revokeAllRefreshTokens(record?.userId);
            return null;
        }

        return {
            id: record?.user?.id,
            name: record?.user?.name,
            email: record?.user?.email
        }
    }

    async revokeRefreshToken(refreshToken: RevokeRefreshToken.Params): Promise<void> {
        await this.prisma.refreshToken.update({
            where: { tokenHash: refreshToken },
            data: { revoked: true, revokedAt: new Date() }
        });
    }

    async revokeAllRefreshTokens(userId: RevokeAllRefreshTokens.Params): Promise<void> {
        await this.prisma.refreshToken.updateMany({
            where: { userId },
            data: { revoked: true, revokedAt: new Date() }
        });
    }

    async revokePreviousRefreshTokens(params: RevokePreviousRefreshToken.Params): Promise<void> {
        const { deviceId, userId } = params;
        await this.prisma.refreshToken.updateMany({
            where: { userId, deviceId, revokedAt: null, revoked: false },
            data: { revoked: true, revokedAt: new Date() }
        });
    }
}