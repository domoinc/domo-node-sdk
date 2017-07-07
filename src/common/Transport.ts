import * as rp from 'request-promise-native';
import * as DEBUG from 'debug';
import { HTTP_METHODS, API_SCOPE } from './Constants';
import { RequestException } from './Errors';
const debug = DEBUG('domo-sdk');

export interface AuthOption {
  username: string;
  password: string;
}

export interface Request {
  url: string;
  method?: number;
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

export default class Transport {
  apiHost: string;
  clientId: string;
  clientSecret: string;
  accessToken: string = '';
  scopes: number[];

  constructor(clientId: string, clientSecret: string, scopes: number[], host: string) {
    this.apiHost = `https://${host}`;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scopes = scopes;
  }

  get(req: Request, type: string) {
    req.method = HTTP_METHODS.GET;
    return this.request(req)
      .catch((err) => {
        const ex = new RequestException(HTTP_METHODS[req.method], req, type, err);
        debug(ex.message);
        throw ex;
      });
  }

  post(req: Request, type: string, isJson?: boolean) {
    req.method = HTTP_METHODS.POST;
    return this.request(req, isJson)
      .catch((err) => {
        const ex = new RequestException(HTTP_METHODS[req.method], req, type, err);
        debug(ex.message);
        throw ex;
      });
  }

  put(req: Request, type: string, isJson?: boolean) {
    req.method = HTTP_METHODS.PUT;
    return this.request(req, isJson)
      .catch((err) => {
        const ex = new RequestException(HTTP_METHODS[req.method], req, type, err);
        debug(ex.message);
        throw ex;
      });
  }

  patch(req: Request, type: string, isJson?: boolean) {
    req.method = HTTP_METHODS.PATCH;
    return this.request(req, isJson)
      .catch((err) => {
        const ex = new RequestException(HTTP_METHODS[req.method], req, type, err);
        debug(ex.message);
        throw ex;
      });
  }

  delete(req: Request, type: string) {
    req.method = HTTP_METHODS.DELETE;
    return this.request(req)
      .catch((err) => {
        const ex = new RequestException(HTTP_METHODS[req.method], req, type, err);
        debug(ex.message);
        throw ex;
      });
  }

  private addAuthHeaders(baseHeaders) {
    if (!this.accessToken) return baseHeaders;
    if (baseHeaders && Object.keys(baseHeaders).indexOf('Authorization') > -1) return baseHeaders;

    const headers = baseHeaders ? Object.assign(baseHeaders) : {};
    headers.Authorization = `bearer ${this.accessToken}`;
    return headers;
  }

  private renewAccessToken() {
    const scope = this.scopes
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
      .then((res) => { this.accessToken = res.access_token; })
      .catch(console.log);
  }

  private request(req: Request, json = true) {
    return rp(this.formatRequest(req, json))
      .catch(err => this.retryRequest(err, req, json));
  }

  private retryRequest(err: any, req: Request, json: boolean) {
    if (err.statusCode === 401) {
      return this.renewAccessToken().then(() => this.request(req, json));
    } else {
      throw err;
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
