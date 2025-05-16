import { AddUser, IUserRepository, LoadUserByEmail, LoadUserById } from "@/domain/repositories/iUserRepository";
import { PrismaClient } from "@prisma/client";

export class UserRepository implements IUserRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async add(params: AddUser.Params): Promise<AddUser.Return> {
        const user = await this.prisma.user.create({
            data: params
        });

        return user;
    }

    async loadUserByEmail(email: string): Promise<LoadUserByEmail.Return> {
        const user = await this.prisma.user.findFirst({
            where: { email }
        });

        return user;
    }

    async loadUserById(id: string): Promise<LoadUserById.Return> {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });

        return user;
    }

    async updateLoginAttempts(userId: string, loginAttempts: number): Promise<void> {
        await this.prisma.user.update({
            where: { id: userId },
            data: { loginAttempts }
        });
    }
}