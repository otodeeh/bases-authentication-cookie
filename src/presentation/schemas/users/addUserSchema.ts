import z from "zod";

export namespace AddUser {
    export const Body = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
    });
    export const Return = z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
    });
}