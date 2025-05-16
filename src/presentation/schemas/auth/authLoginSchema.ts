import z from "zod";

export namespace AuthLoginSchema {
    export const Body = z.object({
        email: z.string().email(),
        password: z.string(),
        deviceId: z.string()
    }); 
    export const Return = z.object({
        id: z.string().uuid(),
        email: z.string().email(),
        name: z.string(),
        accessToken: z.string()
    }).nullable();
}