import DomoAPIClient from '../common/domo-api';
import { HTTPMethod } from '../common/constants';

class StreamClient extends DomoAPIClient {
  constructor(transport) {
    super(transport);

    this.urlBase = '/v1/streams';
    this.clientDesc = 'Stream';
    this.clientExecDesc = 'Stream Execution';
  }

  create(dataSet, updateMethod) {
    return this._create(this.urlBase, { dataSet, updateMethod }, {}, this.clientDesc);
  }

  get(id, fields) {
    return this._get(`${this.urlBase}/${id}`, { fields }, this.clientDesc);
  }

  list(fields) {
    return this._list(this.urlBase, { fields }, this.clientDesc);
  }

  update(id, update) {
    return this._update(`${this.urlBase}/${id}`, HTTPMethod.PATCH, {}, update, true, this.clientDesc);
  }

  delete(id) {
    return this._delete(`${this.urlBase}/${id}`, this.clientDesc);
  }

  search(q, fields) {
    return this._get(`${this.urlBase}/search`, { q, fields }, this.clientDesc);
  }

  createExecution(streamId) {
    return this._create(`${this.urlBase}/${streamId}/executions`, {}, {}, this.clientExecDesc);
  }

  getExecution(streamId, execId) {
    return this._get(`${this.urlBase}/${streamId}/executions/${execId}`, {}, this.clientExecDesc);
  }

  listExecutions(streamId, limit, offset) {
    return this._list(`${this.urlBase}/${streamId}/executions`, { limit, offset }, {}, this.clientExecDesc);
  }

  uploadPart(streamId, execId, partId, data) {
    const url = `${this.urlBase}/${streamId}/executions/${execId}/part/${partId}`;
    const headers = { 'Content-Type': 'text/csv' };
    return this._update(url, HTTPMethod.PUT, headers, data, false, this.clientExecDesc);
  }

  commit(streamId, execId) {
    const url = `${this.urlBase}/${streamId}/executions/${execId}/commit`;
    return this._update(url, HTTPMethod.PUT, {}, {}, true, this.clientExecDesc);
  }

  abort(streamId, execId) {
    const url = execId
      ? `${this.urlBase}/${streamId}/executions/${execId}/abort`
      : `${this.urlBase}/${streamId}/executions/abort`;

    return this._update(url, HTTPMethod.PUT, {}, {}, true, this.clientExecDesc);
  }
}

module.exports = StreamClient;
