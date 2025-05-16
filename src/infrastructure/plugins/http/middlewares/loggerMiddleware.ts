import { JwtAdapter } from "@/infrastructure/adapters";
import { FastifyRequest } from "fastify";

export const loggerMiddleware = async (req: FastifyRequest) => {
    const { body, method, originalUrl, headers } = req;
    const { authorization } = headers;
    const token = authorization?.split(" ")[1];
    const data: any = token ? new JwtAdapter().decrypt(token) : { id: '' };
    const { id: userId } = data;

    console.log('--------------------------------------------Logger---------------------------------------------------');
    console.log(`At ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);
    console.log(`${method} on ${originalUrl}`);
    !!headers['user-agent'] && console.log('Agent:', headers['user-agent']);
    !!userId && console.log(`UserId: ${userId}`);
    !!body && console.log(`Body: `, body);
    !!headers?.origin && console.log(`Origin: ${headers.origin || ""}`);
    console.log('------------------------------------------------------------------------------------------------------');
}