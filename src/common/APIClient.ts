import Transport from './Transport';
import { HTTP_METHODS } from './Constants';

export interface APIClient {
  urlBase: string;
  transport: Transport;

  create(request: any);
  get(id: string);
  list(params?: any);
  update(id: string, request: any);
  delete(id: string);
}
