import { APIClient } from '../common/APIClient';
import Transport, { Request } from '../common/Transport';
import { HTTP_METHODS } from '../common/Constants';

import { DataSet } from '../datasets/models';
import {
  CreateStreamRequest,
  UpdateStreamRequest,
} from './models';

export default class StreamClient implements APIClient {
  urlBase: string = '/v1/streams';
  type: string = 'Stream';
  execType: string = 'Stream Execution';
  transport: Transport;

  constructor(transport) {
    this.transport = transport;
  }

  create(create: CreateStreamRequest) {
    const req: Request = {
      url: this.urlBase,
      body: create,
    };

    return this.transport.post(req, this.type);
  }

  get(id: string, fields: string[] = ['all']) {
    const req: Request = {
      url: `${this.urlBase}/${id}`,
      params: { fields: fields.join() },
    };

    return this.transport.get(req, this.type);
  }

  list(fields: string[] = ['all']) {
    const req: Request = {
      url: this.urlBase,
      params: { fields: fields.join() },
    };

    return this.transport.get(req, this.type);
  }

  update(id: string, update: UpdateStreamRequest) {
    const req: Request = {
      url: `${this.urlBase}/${id}`,
      body: update,
    };

    return this.transport.patch(req, this.type);
  }

  delete(id: string) {
    const req: Request = { url: `${this.urlBase}/${id}` };
    return this.transport.delete(req, this.type);
  }

  search(q: string[], fields: string[] = ['all']) {
    const req: Request = {
      url: `${this.urlBase}/search`,
      params: { q: q.join(), fields: fields.join() },
    };

    return this.transport.get(req, this.type);
  }

  createExecution(streamId: string) {
    const req: Request = { url: `${this.urlBase}/${streamId}/executions` };
    return this.transport.post(req, this.execType);
  }

  getExecution(streamId: string, execId: number) {
    const req: Request = { url: `${this.urlBase}/${streamId}/executions/${execId}` };
    return this.transport.get(req, this.execType);
  }

  listExecutions(streamId: string, limit: number, offset: number) {
    const req = {
      url: `${this.urlBase}/${streamId}/executions`,
      params: { limit, offset },
    };

    return this.transport.get(req, this.execType);
  }

  uploadPart(streamId: string, execId: number, partId: number, csv: string) {
    const req: Request = {
      url: `${this.urlBase}/${streamId}/executions/${execId}/part/${partId}`,
      headers: { 'Content-Type': 'text/csv' },
      body: csv,
    };

    return this.transport.put(req, this.execType, false);
  }

  uploadCompressedPart(streamId: string, execId: number, partId: number, data: string) {
    const req: Request = {
      url: `${this.urlBase}/${streamId}/executions/${execId}/part/${partId}`,
      headers: { 'Content-Type': 'application/gzip' },
      body: data,
    };

    return this.transport.put(req, this.execType, false);
  }

  commit(streamId: string, execId: number) {
    const req: Request = { url: `${this.urlBase}/${streamId}/executions/${execId}/commit` };
    return this.transport.put(req, this.execType);
  }

  abort(streamId: string, execId?: number) {
    const url: string = execId
      ? `${this.urlBase}/${streamId}/executions/${execId}/abort`
      : `${this.urlBase}/${streamId}/executions/abort`;

    const req: Request = { url };
    return this.transport.put(req, this.execType);
  }
}
