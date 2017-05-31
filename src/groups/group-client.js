const DomoAPIClient = require('../common/domo-api');
const HTTPMethod = require('../common/constants').HTTPMethod;

class GroupClient extends DomoAPIClient {
  constructor(transport) {
    super(transport);

    this.urlBase = '/v1/groups';
    this.clientDesc = 'User';
  }

  create(group) {
    return this._create(this.urlBase, group, {}, this.clientDesc);
  }

  get(id) {
    return this._get(`${this.urlBase}/${id}`, {}, this.clientDesc);
  }

  list(limit, offset) {
    return this._list(this.urlBase, { limit, offset }, this.clientDesc);
  }

  update(id, group) {
    return this._update(`${this.urlBase}/${id}`, HTTPMethod.PUT, {}, group, true, this.clientDesc);
  }

  delete(id) {
    return this._delete(`${this.urlBase}/${id}`, this.clientDesc);
  }

  addUser(groupId, userId) {
    return this._update(`${this.urlBase}/${groupId}/users/${userId}`, HTTPMethod.PUT, {}, true, this.clientDesc);
  }

  listUsers(groupId, limit, offset) {
    return this._list(`${this.urlBase}/${groupId}/users`, { limit, offset }, this.clientDesc);
  }

  removeUser(groupId, userId) {
    return this._delete(`${this.urlBase}/${groupId}/users/${userId}`, this.clientDesc);
  }
}

module.exports = GroupClient;
