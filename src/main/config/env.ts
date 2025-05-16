export const env = {
    isProduction: process.env.NODE_ENV === 'production',
    api: {
        port: Number(process.env.API_PORT) || 3000,
        host: process.env.API_HOST || '127.0.0.1'
    },
    fastify: {
        logLevel: process?.env?.LOG_LEVEL || 'error'
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    bcrypt: {
        salt: 12
    }
}