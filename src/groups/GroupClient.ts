import Transport, { Request } from '../common/Transport';
import { HTTP_METHODS } from '../common/Constants';
import { Group } from './models';

export default class GroupClient {
  urlBase: string = '/v1/groups';
  type: string = 'Group';
  transport: Transport;

  constructor(transport) {
    this.transport = transport;
  }

  create(group: Group): Promise<Group> {
    const req: Request = {
      url: this.urlBase,
      body: group,
    };

    return this.transport.post(req, this.type);
  }

  get(id: string): Promise<Group> {
    const req: Request = { url: `${this.urlBase}/${id}` };
    return this.transport.get(req, this.type);
  }

  list(limit: number, offset: number): Promise<Group[]> {
    const req: Request = {
      url: this.urlBase,
      params: { limit, offset },
    };

    return this.transport.get(req, this.type);
  }

  update(id: string, group: Group): Promise<Group> {
    const req: Request = {
      url: `${this.urlBase}/${id}`,
      body: group,
    };

    return this.transport.put(req, this.type);
  }

  delete(id: string): Promise<void> {
    const req: Request = { url: `${this.urlBase}/${id}` };
    return this.transport.delete(req, this.type);
  }

  addUser(groupId: string, userId: number): Promise<void> {
    const req: Request = { url: `${this.urlBase}/${groupId}/users/${userId}` };
    return this.transport.put(req, this.type);
  }

  listUsers(groupId: string, limit: number, offset: number): Promise<number[]> {
    const req: Request = {
      url: `${this.urlBase}/${groupId}/users`,
      params: { limit, offset },
    };

    return this.transport.get(req, this.type);
  }

  removeUser(groupId: string, userId: number): Promise<void> {
    const req: Request = { url: `${this.urlBase}/${groupId}/users/${userId}` };
    return this.transport.delete(req, this.type);
  }
}
