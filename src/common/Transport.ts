import * as rp from 'request-promise-native';
import * as DEBUG from 'debug';
import { TransportClientError } from './Errors';
import { HTTP_METHODS, API_SCOPE } from './Constants';
const debug = DEBUG('domo-sdk');

export interface AuthOption {
  username: string;
  password: string;
}

export interface Request {
  url: string;
  method: number;
  headers?: any;
  params?: any;
  body?: any;
  auth?: AuthOption;
}

export interface RequestOptions {
  url: string;
  method: string;
  auth?: AuthOption;
  headers?: any;
  qs?: any;
  body?: any;
  json?: boolean;
}

export default class TransportClient {
  apiHost: string = 'api.domo.com';
  clientId: string;
  clientSecret: string;
  accessToken: string = '';
  scope: number[] = [API_SCOPE.USER, API_SCOPE.DATA];

  constructor(clientId: string, clientSecret: string, scope?: number[], host?: string) {
    if (!clientId || !clientSecret) {
      const msg = 'Missing required API credentials';
      debug(msg);
      throw new TransportClientError(msg);
    }

    this.apiHost = `https://${host}`;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scope = scope;
  }

  get(req: Request) {
    req.method = HTTP_METHODS.GET;
    return this.request(req);
  }

  post(req: Request, isJson?: boolean) {
    req.method = HTTP_METHODS.POST;
    return this.request(req, isJson);
  }

  put(req: Request, isJson?: boolean) {
    req.method = HTTP_METHODS.PUT;
    return this.request(req, isJson);
  }

  patch(req: Request, isJson?: boolean) {
    req.method = HTTP_METHODS.PATCH;
    return this.request(req, isJson);
  }

  delete(req: Request) {
    req.method = HTTP_METHODS.DELETE;
    return this.request(req);
  }

  private addAuthHeaders(baseHeaders) {
    if (baseHeaders && Object.keys(baseHeaders).indexOf('Authorization') > -1) return baseHeaders;

    const headers = baseHeaders ? Object.assign(baseHeaders) : {};
    headers.Authorization = `bearer ${this.accessToken}`;
    return headers;
  }

  private renewAccessToken() {
    const scope = this.scope
      .map(s => API_SCOPE[s])
      .join(' ');

    const req: Request = {
      url: '/oauth/token',
      method: HTTP_METHODS.GET,
      params: { scope, grant_type: 'client_credentials' },
      auth: {
        username: this.clientId,
        password: this.clientSecret,
      },
    };

    return this.request(req)
      .then((res) => { this.accessToken = res.access_token; });
  }

  private request(req: Request, json = true) {
    return rp(this.formatRequest(req, json))
      .then(res => this.validateResponse(res, req, json));
  }

  private validateResponse(res: any, req: Request, json: boolean) {
    if (res.statusCode === 401) {
      return this.renewAccessToken().then(() => this.request(req, json));
    } else {
      return res;
    }
  }

  private formatRequest(req: Request, json: boolean) {
    const options: RequestOptions = {
      json,
      url: `${this.apiHost}${req.url}`,
      method: HTTP_METHODS[req.method],
      qs: req.params,
      body: req.body,
      headers: this.addAuthHeaders(req.headers),
    };

    if (req.auth) options.auth = req.auth;

    return options;
  }
}
