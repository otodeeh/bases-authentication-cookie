export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  cookies?: any;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
  cookies?: any;
}

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
