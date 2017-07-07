import { APIClient } from '../common/APIClient';
import Transport from '../common/Transport';
import { HTTP_METHODS } from '../common/Constants';

export default class UserClient implements APIClient {
  constructor(transport) {
    super(transport);

    this.urlBase = '/v1/users';
    this.clientDesc = 'User';
  }

  create(user, sendInvite) {
    return this._create(this.urlBase, user, { sendInvite }, this.clientDesc);
  }

  get(id) {
    return this._get(`${this.urlBase}/${id}`, {}, this.clientDesc);
  }

  list(limit, offset) {
    return this._list(this.urlBase, { limit, offset }, this.clientDesc);
  }

  update(id, user) {
    return this._update(`${this.urlBase}/${id}`, HTTPMethod.PUT, {}, user, true, this.clientDesc);
  }

  delete(id) {
    return this._delete(`${this.urlBase}/${id}`, this.clientDesc);
  }
}
