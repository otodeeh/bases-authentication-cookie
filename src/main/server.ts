import "./config/module-alias";

import {
  FastifyApplication,
  registerShutdown
} from "@/infrastructure/plugins/http/fastify";
import { env } from "@/main/config";

(async () => {
  try {
    const { app } = new FastifyApplication();
    await app.listen({ port: env?.api?.port, host: env?.api?.host });
    console.log(
      `API is running on http://${env?.api?.host}:${env?.api?.port}/api`
    );

    if (process.env.NODE_ENV !== "production") {
      console.log(
        `API is running on http://${env?.api?.host}:${env?.api?.port}/api/docs`
      );
    }

    registerShutdown(app);
  } catch (error) {
    console.error({ error });
    process.exit(1);
  }
})();
