import { prismaClient } from "@/infrastructure/database/prisma";
import { FastifyInstance } from "fastify";

export function registerPrisma(app: FastifyInstance) {
  app.decorate("prisma", prismaClient);

  app.addHook("onClose", async () => {
    await app.prisma.$disconnect();
  });
}
