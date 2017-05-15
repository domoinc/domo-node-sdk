import { TransportClientError } from '../errors';
import rp from 'request-promise';
const debug = require('debug')('domo-sdk');

class TransportClient {
  constructor(clientId, clientSecret, host) {
    if (!clientId || !clientSecret) throw new TransportClientError('Missing required API credentials');

    this.apiHost = `https://${host || 'api.domo.com'}`;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.accessToken = '';
  }

  addAuthHeaders(baseHeaders) {
    if (baseHeaders && Object.keys(baseHeaders).indexOf('Authorization') > -1) return baseHeaders;

    const headers = baseHeaders ? Object.assign(baseHeaders) : {};
    headers.Authorization = `bearer ${this.accessToken}`;
    return headers;
  }

  validateAccessToken() {
    return this._tokenExpired()
      .catch(() => {
        debug('TransportClient: Token Expired. Requesting new token now.');
        return this._renewAccessToken();
      });
  }

  _tokenExpired() {
    return this.request('/v1/users', 'GET');
  }

  _renewAccessToken() {
    const qs = { grant_type: 'client_credentials', scope: 'data user' };
    return this.request('/oauth/token', 'GET', {}, qs)
      .auth(this.clientId, this.clientSecret)
      .then(res => { this.accessToken = res.access_token; });
  }

  get({ url, headers, params }) {
    return this.request(url, 'GET', headers, params);
  }

  post({ url, headers, params, body }, isJson) {
    return this.request(url, 'POST', headers, params, body, isJson);
  }

  put({ url, headers, body }, isJson) {
    return this.request(url, 'PUT', headers, null, body, isJson);
  }

  patch({ url, headers, body }, isJson) {
    return this.request(url, 'PATCH', headers, null, body, isJson);
  }

  delete({ url, headers }) {
    return this.request(url, 'DELETE', headers);
  }

  request(url, method, headers, qs, body, isJson) {
    const options = {
      url: this.buildURL(url),
      headers: this.addAuthHeaders(headers),
      method,
      qs,
      body,
      json: typeof isJson === 'undefined' || isJson
    };

    return rp(options);
  }

  buildURL(url) {
    return `${this.apiHost}${url}`;
  }
}

module.exports = TransportClient;
