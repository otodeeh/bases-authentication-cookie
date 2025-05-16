import { FastifyInstance } from "fastify";

export function registerShutdown(app: FastifyInstance) {
  const shutdown = async (sig: NodeJS.Signals) => {
    app.log.warn(`signal ${sig}, shutting down`);
    try {
      await app.close();
      process.exit(0);
    } catch (e) {
      app.log.error(e);
      process.exit(1);
    }
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}