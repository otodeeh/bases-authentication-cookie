import { User } from "@/domain/entities";

export interface IUserRepository {
    add(params: AddUser.Params): Promise<AddUser.Return>;
    loadUserById(id: string): Promise<LoadUserById.Return>;
    loadUserByEmail(email: string): Promise<LoadUserByEmail.Return>;
    updateLoginAttempts(userId: string, loginAttempts: number): Promise<void>;
}

export namespace AddUser {
    export type Params = Omit<User, "id" | "createdAt" | "updatedAt" | "loginAttempts">;
    export type Return = Omit<User, "loginAttempts" | "password" | "createdAt" | "updatedAt">;
}

export namespace LoadUserByEmail {
    export type Return = Omit<User, | "createdAt" | "updatedAt"> | null;
}

export namespace LoadUserById {
    export type Return = Omit<User, "password" | "createdAt" | "updatedAt"> | null;
}