export class RequestException extends Error {
  method: string;
  type: string;
  source: any;

  constructor(method: string, type: string, source: any) {
    super(`Unable to ${method} ${type}`);
    this.method = method;
    this.type = type;
    this.source = source;
  }
}

export class ClientConfigException extends Error {
  name: string;

  constructor(missingConfig: string) {
    super(`Missing required configuration parameter: ${missingConfig}`);
    this.name = 'ClientConfigException';
  }
}
