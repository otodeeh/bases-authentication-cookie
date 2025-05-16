export type RefreshToken = {
    id: string;
    userId: string;
    tokenHash: string;
    deviceId: string;
    userAgent?: string | null;
    createdAt: Date;
    expiresAt: Date;
    rotatedAt?: Date | null;
    revoked?: boolean;
    revokedAt?: Date | null;
    replacedById?: string | null;
    replacedBy?: any | null;
    replaced?: any | null;
}