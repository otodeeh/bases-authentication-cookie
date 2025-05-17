import { User } from "@/domain/entities";

export namespace AuthLogin {
    export type Params = { email: string, password: string, deviceId: string };
    export type Return = Omit<User, "loginAttempts" | "password" | "createdAt" | "updatedAt"> & { accessToken: string, refreshToken: string } | null;
}

export namespace AuthValidateToken {
    export type Params = string;
    export type Return = {
        accessToken: string;
        refreshToken: string;
    };
}