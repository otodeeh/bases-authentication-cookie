import { RefreshToken } from "@/domain/entities";

export interface IRefreshTokenRepository {
    add(params: AddRefreshToken.Params): Promise<void>;
    validateRefreshToken(refreshToken:ValidateRefreshToken.Params): Promise<ValidateRefreshToken.Return>;
    revokeRefreshToken(refreshToken: RevokeRefreshToken.Params): Promise<void>;
    revokeAllRefreshTokens(userId: RevokeAllRefreshTokens.Params): Promise<void>;
    revokePreviousRefreshTokens(params: RevokePreviousRefreshToken.Params): Promise<void>;
}

export namespace RenoveRefreshToken {
    export type Params = Omit<RefreshToken, "id">;
    export type Return = RefreshToken;
}

export namespace AddRefreshToken {
    export type Params = Omit<RefreshToken, "id" | "createdAt">;
}

export namespace ValidateRefreshToken {
    export type Params = string;
    export type Return = {
        id: string;
        name: string;
        email: string;
    } | null;
}

export namespace RevokeRefreshToken {
    export type Params = string;
}

export namespace RevokeAllRefreshTokens {
    export type Params = string;
}

export namespace RevokePreviousRefreshToken {
    export type Params = { userId: string, deviceId: string }
}