import Transport, { Request } from '../common/Transport';
import { HTTP_METHODS } from '../common/Constants';

import { DataSet } from '../datasets/models';
import { Stream, StreamExecution } from './models';

export default class StreamClient {
  urlBase: string = '/v1/streams';
  type: string = 'Stream';
  execType: string = 'Stream Execution';
  transport: Transport;

  constructor(transport) {
    this.transport = transport;
  }

  create(stream: Stream): Promise<Stream> {
    const req: Request = {
      url: this.urlBase,
      body: stream,
    };

    return this.transport.post(req, this.type);
  }

  get(id: string, fields: string[] = ['all']): Promise<Stream> {
    const req: Request = {
      url: `${this.urlBase}/${id}`,
      params: { fields: fields.join() },
    };

    return this.transport.get(req, this.type);
  }

  list(fields: string[] = ['all']): Promise<Stream[]> {
    const req: Request = {
      url: this.urlBase,
      params: { fields: fields.join() },
    };

    return this.transport.get(req, this.type);
  }

  update(id: string, stream: Stream): Promise<Stream> {
    const req: Request = {
      url: `${this.urlBase}/${id}`,
      body: stream,
    };

    return this.transport.patch(req, this.type);
  }

  delete(id: string): Promise<void> {
    const req: Request = { url: `${this.urlBase}/${id}` };
    return this.transport.delete(req, this.type);
  }

  search(q: string[], fields: string[] = ['all']): Promise<Stream[]> {
    const req: Request = {
      url: `${this.urlBase}/search`,
      params: { q: q.join(), fields: fields.join() },
    };

    return this.transport.get(req, this.type);
  }

  createExecution(streamId: string): Promise<StreamExecution> {
    const req: Request = { url: `${this.urlBase}/${streamId}/executions` };
    return this.transport.post(req, this.execType);
  }

  getExecution(streamId: string, execId: number): Promise<StreamExecution> {
    const req: Request = { url: `${this.urlBase}/${streamId}/executions/${execId}` };
    return this.transport.get(req, this.execType);
  }

  listExecutions(streamId: string, limit: number, offset: number): Promise<StreamExecution[]> {
    const req = {
      url: `${this.urlBase}/${streamId}/executions`,
      params: { limit, offset },
    };

    return this.transport.get(req, this.execType);
  }

  uploadPart(id: string, exec: number, part: number, csv: string): Promise<StreamExecution> {
    const req: Request = {
      url: `${this.urlBase}/${id}/executions/${exec}/part/${part}`,
      headers: { 'Content-Type': 'text/csv' },
      body: csv,
    };

    return this.transport.put(req, this.execType, false);
  }

  uploadCompressedPart(id: string, exec: number, part: number, data: string): Promise<StreamExecution> {
    const req: Request = {
      url: `${this.urlBase}/${id}/executions/${exec}/part/${part}`,
      headers: {
                'Content-Type': 'text/csv',
                'Content-Encoding': 'gzip'
      },
      body: data,
    };

    return this.transport.put(req, this.execType, false);
  }

  commit(streamId: string, execId: number): Promise<StreamExecution> {
    const req: Request = { url: `${this.urlBase}/${streamId}/executions/${execId}/commit` };
    return this.transport.put(req, this.execType);
  }

  abort(streamId: string, exec?: number): Promise<StreamExecution> {
    const url: string = exec
      ? `${this.urlBase}/${streamId}/executions/${exec}/abort`
      : `${this.urlBase}/${streamId}/executions/abort`;

    const req: Request = { url };
    return this.transport.put(req, this.execType);
  }
}
