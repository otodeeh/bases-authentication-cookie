import { env } from '@/main/config';
import { Controller, HttpRequest } from '@/presentation/protocols/controller';
import { FastifyReply, FastifyRequest } from 'fastify';

export const routeAdapter = (controller: Controller) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
      headers: request.headers,
      cookies: request.cookies
    }
    const { statusCode, body, cookies } = await controller.handle(httpRequest);
    if (cookies?.logout) {
      reply.clearCookie("refreshToken", {
        httpOnly: env.isProduction,
        secure: env.isProduction,
        sameSite: env.isProduction ? "strict" : "lax",
        path: '/',
      });
    } 
    if (cookies?.refreshToken) {
      reply.setCookie('refreshToken', cookies?.refreshToken, {
        httpOnly: env.isProduction,
        secure: env.isProduction,
        sameSite: env.isProduction ? "strict" : "lax",
        path: '/',
        maxAge: 7 * 24 * 60 * 60
      });
    }
    reply.status(statusCode).send(body);
  }
}
