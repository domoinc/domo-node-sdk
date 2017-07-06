export class DomoAPIClientError extends Error {
  name: string;
  trigger: string;
  source: string;

  constructor(message: string, err: string, source: string) {
    super(message);
    this.name = 'DomoAPIClientError';
    this.trigger = err;
    this.source = source;
  }
}

export class TransportClientError extends Error {
  name: string;

  constructor(message: string) {
    super(message);
    this.name = 'TransportClientError';
  }
}
