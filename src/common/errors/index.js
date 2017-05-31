class DomoAPIClientError extends Error {
  constructor(message, err, source) {
    super(message);
    this.name = 'DomoAPIClientError';
    this.trigger = err;
    this.source = source;
  }
}

class TransportClientError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TransportClientError';
  }
}

module.exports = {
  TransportClientError,
  DomoAPIClientError,
};
