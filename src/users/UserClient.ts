import Transport, { Request } from '../common/Transport';
import { HTTP_METHODS } from '../common/Constants';
import { User } from './models';

export default class UserClient {
  urlBase: string = '/v1/users';
  type: string = 'User';
  transport: Transport;

  constructor(transport: Transport) {
    this.transport = transport;
  }

  create(user: User, sendInvite = true): Promise<User> {
    const req: Request = {
      url: this.urlBase,
      body: user,
      params: { sendInvite },
    };

    return this.transport.post(req, this.type);
  }

  get(id: string): Promise<User> {
    const req: Request = { url: `${this.urlBase}/${id}` };
    return this.transport.get(req, this.type);
  }

  list(limit: number, offset: number): Promise<User[]> {
    const req: Request = {
      url: this.urlBase,
      params: { limit, offset },
    };

    return this.transport.get(req, this.type);
  }

  update(id: string, user: User): Promise<User> {
    const req: Request = {
      url: `${this.urlBase}/${id}`,
      body: user,
    };

    return this.transport.put(req, this.type);
  }

  delete(id: string): Promise<void> {
    const req: Request = { url: `${this.urlBase}/${id}` };
    return this.transport.delete(req, this.type);
  }
}
