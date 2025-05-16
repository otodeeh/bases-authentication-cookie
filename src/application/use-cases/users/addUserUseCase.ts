import { AddUser, IUserRepository } from "@/domain/repositories";
import { BcryptAdapter } from "@/infrastructure/adapters";

export class AddUserUseCase {
    constructor (
        private readonly bcrypt: BcryptAdapter,
        private readonly userRepo: IUserRepository,
    ) {}

    async execute(params: AddUser.Params) {
        const { password, ...rest } = params;
        const passwordHash = await this.bcrypt.hash(password);
        const user = this.userRepo.add({ ...rest, password: passwordHash });
        return user;
    }
}