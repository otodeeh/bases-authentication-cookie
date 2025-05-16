import z from "zod";

export namespace AuthLogoutGlobalSchema {
    export const Body = z.object({
        userId: z.string()
    });
}