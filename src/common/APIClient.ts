import Transport from './Transport';
import { HTTP_METHODS } from './Constants';

export interface APIClient {
  urlBase: string;
  transport: Transport;

  create(create: any);
  get(id: string);
  list(params?: any);
  update(id: string, update: any);
  delete(id: string);
}
