import Transport, { Request } from '../common/Transport';
import { HTTP_METHODS } from '../common/Constants';
import { Policy } from './models';

export default class PDPClient {
  urlBase: string;
  type: string = 'Personalized Data Permission (PDP)';
  transport: Transport;

  constructor(transport: Transport) {
    this.urlBase = '/v1/datasets';
    this.transport = transport;
  }

  create(datasetId: string, policy: Policy): Promise<Policy> {
    const req: Request = {
      url: `${this.urlBase}/${datasetId}/policies`,
      body: policy,
    };

    return this.transport.post(req, this.type);
  }

  get(datasetId: string, policyId: number): Promise<Policy> {
    const req: Request = { url: `${this.urlBase}/${datasetId}/policies/${policyId}` };

    return this.transport.get(req, this.type);
  }

  list(datasetId: string): Promise<Policy[]> {
    const req: Request = { url: `${this.urlBase}/${datasetId}/policies` };

    return this.transport.get(req, this.type);
  }

  update(datasetId: string, policyId: number, policy: Policy): Promise<Policy> {
    const req: Request = {
      url: `${this.urlBase}/${datasetId}/policies/${policyId}`,
      body: policy,
    };

    return this.transport.put(req, this.type);
  }

  delete(datasetId: string, policyId: number): Promise<void> {
    const req: Request = { url: `${this.urlBase}/${datasetId}/policies/${policyId}` };

    return this.transport.delete(req, this.type);
  }
}
