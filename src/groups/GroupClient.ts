import { APIClient } from '../common/APIClient';
import Transport, { Request } from '../common/Transport';
import { HTTP_METHODS } from '../common/Constants';
import {
  CreateGroupRequest,
  ListGroupRequest,
  UpdateGroupRequest,
  ListGroupUsersRequest,
 } from './models';

export default class GroupClient implements APIClient {
  urlBase: string = '/v1/groups';
  type: string = 'Group';
  transport: Transport;

  constructor(transport) {
    this.transport = transport;
  }

  create(group: CreateGroupRequest) {
    const req: Request = {
      url: this.urlBase,
      body: group,
    };

    return this.transport.post(req, this.type);
  }

  get(id: string) {
    const req: Request = { url: `${this.urlBase}/${id}` };
    return this.transport.get(req, this.type);
  }

  list(params: ListGroupRequest) {
    const req: Request = {
      params,
      url: this.urlBase,
    };

    return this.transport.get(req, this.type);
  }

  update(id: string, update: UpdateGroupRequest) {
    const req: Request = {
      url: `${this.urlBase}/${id}`,
      body: update,
    };

    return this.transport.put(req, this.type);
  }

  delete(id: string) {
    const req: Request = { url: `${this.urlBase}/${id}` };
    return this.transport.delete(req, this.type);
  }

  addUser(groupId: string, userId: number) {
    const req: Request = { url: `${this.urlBase}/${groupId}/users/${userId}` };
    return this.transport.put(req, this.type);
  }

  listUsers(groupId: string, params: ListGroupUsersRequest) {
    const req: Request = {
      params,
      url: `${this.urlBase}/${groupId}/users`,
    };

    return this.transport.get(req, this.type);
  }

  removeUser(groupId: string, userId: number) {
    const req: Request = { url: `${this.urlBase}/${groupId}/users/${userId}` };
    return this.transport.delete(req, this.type);
  }
}
