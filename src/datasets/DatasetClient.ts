import { APIClient } from '../common/APIClient';
import Transport, { Request } from '../common/Transport';
import { HTTP_METHODS } from '../common/Constants';
import {
  CreateDatasetRequest,
  UpdateDatasetRequest,
  ListDatasetRequest,
  CreatePolicyRequest,
  UpdatePolicyRequest,
} from './models';

export default class DatasetClient implements APIClient {
  urlBase: string;
  type: string = 'Dataset';
  pdpType: string = 'Personalized Data Permission (PDP)';
  transport: Transport;

  constructor(transport: Transport) {
    this.urlBase = '/v1/datasets';
    this.transport = transport;
  }

  create(create: CreateDatasetRequest) {
    const req: Request = {
      url: this.urlBase,
      body: create,
    };

    return this.transport.post(req, this.type);
  }

  get(id: string) {
    const req: Request = { url: `${this.urlBase}/${id}` };
    return this.transport.get(req, this.type);
  }

  list(params: ListDatasetRequest) {
    const req: Request = {
      params,
      url: this.urlBase,
    };

    return this.transport.get(req, this.type);
  }

  update(id: string, update: UpdateDatasetRequest) {
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

  importData(id: string, csv: string) {
    const req: Request = {
      url: `${this.urlBase}/${id}/data`,
      headers: { 'Content-Type': 'text/csv' },
      body: csv,
    };

    return this.transport.put(req, this.type, false);
  }

  exportData(id: string, includeHeader = false) {
    const req: Request = {
      url: `${this.urlBase}/${id}/data`,
      headers: { Accept: 'text/csv' },
      params: {
        includeHeader,
        fileName: 'foo.csv',
      },
    };

    return this.transport.get(req, this.type);
  }

  createPDP(datasetId: string, policy: CreatePolicyRequest) {
    const req: Request = {
      url: `${this.urlBase}/${datasetId}/policies`,
      body: policy,
    };

    return this.transport.post(req, this.pdpType);
  }

  getPDP(datasetId: string, policyId: number) {
    const req: Request = { url: `${this.urlBase}/${datasetId}/policies/${policyId}` };

    return this.transport.get(req, this.pdpType);
  }

  listPDP(datasetId: string) {
    const req: Request = { url: `${this.urlBase}/${datasetId}/policies` };

    return this.transport.get(req, this.pdpType);
  }

  updatePDP(datasetId: string, policyId: number, policy: UpdatePolicyRequest) {
    const req: Request = {
      url: `${this.urlBase}/${datasetId}/policies/${policyId}`,
      body: policy,
    };

    return this.transport.put(req, this.pdpType);
  }

  deletePDP(datasetId, policyId) {
    const req: Request = { url: `${this.urlBase}/${datasetId}/policies/${policyId}` };

    return this.transport.delete(req, this.pdpType);
  }
}
