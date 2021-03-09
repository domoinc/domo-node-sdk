import Transport, { Request } from '../common/Transport';
import { HTTP_METHODS } from '../common/Constants';
import { DataSet, Policy } from './models';

export default class DatasetClient {
  urlBase: string = '/v1/datasets';
  type: string = 'Dataset';
  transport: Transport;

  constructor(transport: Transport) {
    this.transport = transport;
  }

  create(dataset: DataSet): Promise<DataSet> {
    const req: Request = {
      url: this.urlBase,
      body: dataset,
    };

    return this.transport.post(req, this.type);
  }

  get(id: string): Promise<DataSet> {
    const req: Request = { url: `${this.urlBase}/${id}` };
    return this.transport.get(req, this.type);
  }

  list(limit: number, offset: number, sort: string): Promise<DataSet[]> {
    const req: Request = {
      url: this.urlBase,
      params: { limit, offset, sort },
    };

    return this.transport.get(req, this.type);
  }

  update(id: string, dataset: DataSet): Promise<DataSet> {
    const req: Request = {
      url: `${this.urlBase}/${id}`,
      body: dataset,
    };

    return this.transport.put(req, this.type);
  }

  delete(id: string): Promise<void> {
    const req: Request = { url: `${this.urlBase}/${id}` };
    return this.transport.delete(req, this.type);
  }

  importData(id: string, csv: string, append: boolean = false): Promise<void> {
    const req: Request = {
      url: `${this.urlBase}/${id}/data?updateMethod=${append ? 'APPEND' : 'REPLACE'}`,
      headers: { 'Content-Type': 'text/csv' },
      body: csv,
    };

    return this.transport.put(req, this.type, false);
  }

  exportData(id: string, includeHeader = false): Promise<string> {
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
}
