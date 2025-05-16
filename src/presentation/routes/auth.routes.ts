import { routeAdapter } from "@/infrastructure/plugins/http/fastify";
import { authMiddleware } from "@/infrastructure/plugins/http/middlewares";
import { AuthLoginController, AuthLogoutController, AuthLogoutGlobalController, ValidateRefreshTokenController } from "@/presentation/controllers/auth";
import { AuthLoginSchema, AuthLogoutGlobalSchema, ValidateRefreshToken } from "@/presentation/schemas/auth";
import { FastifyTypedInstance } from "fastify";

export function authRoutes(app: FastifyTypedInstance) {
    app.post('/login', {
        schema: {
            tags: ['auth'],
            description: 'Login',
            body: AuthLoginSchema.Body,
            response: {
                200: AuthLoginSchema.Return
            },
        },
        handler: routeAdapter(new AuthLoginController()),
    });
    app.get('/refresh', {
        preHandler: authMiddleware,
        schema: {
            tags: ['auth'],
            description: 'Validate access tokens',
            response: {
                200: ValidateRefreshToken.Return
            }
        },
        handler: routeAdapter(new ValidateRefreshTokenController())
    });
    app.post('/logout', {
        preHandler: authMiddleware,
        schema: {
            tags: ['auth'],
            description: 'Logout'
        },
        handler: routeAdapter(new AuthLogoutController())
    });
    app.post('/logout-all', {
        preHandler: authMiddleware,
        schema: {
            tags: ['auth'],
            description: 'Logout all sessions',
            body: AuthLogoutGlobalSchema.Body
        },
        handler: routeAdapter(new AuthLogoutGlobalController())
    });
}