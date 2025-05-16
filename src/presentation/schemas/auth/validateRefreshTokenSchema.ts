import z from "zod";

export namespace ValidateRefreshToken {
    export const Return = z.object({
        accessToken: z.string()
    });
}