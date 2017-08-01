import { Request } from './Transport';

export class RequestException extends Error {
  method: string;
  type: string;
  path: string;
  error: any;

  constructor(method: string, req: Request, type: string, error: any) {
    super(`Unable to ${method} ${req.url} for ${type}`);
    this.method = method;
    this.type = type;
    this.path = req.url;
    this.error = error;
  }
}

export class ClientConfigException extends Error {
  name: string;

  constructor(missingConfig: string) {
    super(`Missing required configuration parameter: ${missingConfig}`);
    this.name = 'ClientConfigException';
  }
}
