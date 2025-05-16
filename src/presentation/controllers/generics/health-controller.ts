import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols/controller";

export class HealthController implements Controller {
  async handle(_: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: { status: 'OK' }
    }
  }
}
