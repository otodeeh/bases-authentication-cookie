export type User = {
    id: string
    email: string
    loginAttempts: number;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}