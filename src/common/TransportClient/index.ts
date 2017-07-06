import * as rp from 'request-promise-native';
import * as DEBUG from 'debug';
import { TransportClientError } from '../errors';
import { HTTP_METHODS } from '../constants';
const debug = DEBUG('domo-sdk');

export interface iRequest {
  url: string;
  headers: any;
  params: any;
  body: any;
}

export default class TransportClient {
  apiHost: string;
  clientId: string;
  clientSecret: string;
  accessToken: string;

  constructor(clientId: string, clientSecret: string, host?: string) {
    if (!clientId || !clientSecret) {
      const msg = 'Missing required API credentials';
      debug(msg);
      throw new TransportClientError(msg);
    }

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
    return this.tokenExpired()
      .catch(() => {
        debug('TransportClient: Token Expired. Requesting new token now.');
        return this.renewAccessToken();
      });
  }

  tokenExpired() {
    return this.request('/v1/users', HTTP_METHODS.GET);
  }

  renewAccessToken() {
    const qs = { grant_type: 'client_credentials', scope: 'data user' };
    return this.request('/oauth/token', HTTP_METHODS.GET, {}, qs)
      .then((res) => { this.accessToken = res.access_token; });
  }

  get(req: iRequest) {
    return this.request(req.url, HTTP_METHODS.GET, req.headers, req.params);
  }

  post(req: iRequest, isJson: boolean) {
    return this.request(req.url, HTTP_METHODS.POST, req.headers, req.params, req.body, isJson);
  }

  put(req: iRequest, isJson = true) {
    return this.request(req.url, HTTP_METHODS.PUT, req.headers, null, req.body, isJson);
  }

  patch(req: iRequest, isJson = true) {
    return this.request(req.url, HTTP_METHODS.PATCH, req.headers, null, req.body, isJson);
  }

  delete(req: iRequest) {
    return this.request(req.url, HTTP_METHODS.DELETE, req.headers);
  }

  request(url: string, method: number, headers?: any, qs?: any, body?: any, json = true) {
    const options = {
      qs,
      body,
      json,
      method: HTTP_METHODS[method],
      url: this.buildURL(url),
      headers: this.addAuthHeaders(headers),
      auth: { username: this.clientId, password: this.clientSecret },
    };

    return rp(options);
  }

  buildURL(url: string) {
    return `${this.apiHost}${url}`;
  }
}
