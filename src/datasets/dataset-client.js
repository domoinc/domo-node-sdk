const DomoAPIClient = require('../common/domo-api');
const HTTPMethod = require('../common/constants').HTTPMethod;

class DatasetClient extends DomoAPIClient {
  constructor(transport) {
    super(transport);

    this.urlBase = '/v1/datasets';
    this.clientDesc = 'Dataset';
    this.pdpDesc = 'Personalized Data Permissions (PDP)';
  }

  create(request) {
    return this._create(this.urlBase, request, {}, this.clientDesc);
  }

  get(id) {
    return this._get(`${this.urlBase}/${id}`, {}, this.clientDesc);
  }

  list(sort, limit, offset) {
    return this._list(this.urlBase, { sort, limit, offset }, this.clientDesc);
  }

  update(id, update) {
    return this._update(`${this.urlBase}/${id}`, HTTPMethod.PUT, {}, update, true, this.clientDesc);
  }

  delete(id) {
    return this._delete(`${this.urlBase}/${id}`, this.clientDesc);
  }

  importData(id, csv) {
    const url = `${this.urlBase}/${id}/data`;
    const headers = { 'Content-Type': 'text/csv' };

    return this._update(url, HTTPMethod.PUT, headers, csv, false, this.clientDesc);
  }

  exportData(id, includeHeader) {
    const url = `${this.urlBase}/${id}/data`;
    const headers = { Accept: 'text/csv' };
    const params = {
      includeHeader: typeof includeHeader === 'undefined' || includeHeader,
      fileName: 'foo.csv'
    };

    return this._get(url, params, headers, this.clientDesc);
  }

  createPDP(datasetId, policy) {
    return this._create(`${this.urlBase}/${datasetId}/policies`, policy, {}, this.pdpDesc);
  }

  getPDP(datasetId, policyId) {
    return this._get(`${this.urlBase}/${datasetId}/policies/${policyId}`, {}, this.pdpDesc);
  }

  listPDP(datasetId) {
    return this._list(`${this.urlBase}/${datasetId}/policies`, {}, this.pdpDesc);
  }

  updatePDP(datasetId, policyId, policy) {
    const url = `${this.urlBase}/${datasetId}/policies/${policyId}`;
    return this._update(url, HTTPMethod.PUT, {}, policy, true, this.pdpDesc);
  }

  deletePDP(datasetId, policyId) {
    return this._delete(`${this.urlBase}/${datasetId}/policies/${policyId}`, this.pdpDesc);
  }
}

module.exports = DatasetClient;
