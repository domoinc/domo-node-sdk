import * as sinon from 'sinon';
import { expect } from 'chai';

import StreamClient from '../src/streams/StreamClient';
import Transport from '../src/common/Transport';
import { HTTP_METHODS, API_SCOPE, UPDATE_METHODS } from '../src/common/Constants';
import { CreateStreamRequest, UpdateStreamRequest } from '../src/streams/models';

describe('(Client): Stream', () => {
  let client;

  beforeEach(() => {
    const transport = new Transport('test', 'test', [API_SCOPE.USER], 'api.domo.com');
    client = new StreamClient(transport);
  });

  it('should instantiate', () => {
    expect(StreamClient).to.exist;
    expect(client).to.be.an.instanceOf(StreamClient);
  });

  it('should have correct URL base', () => {
    expect(client.urlBase).to.equal('/v1/streams');
  });

  it('should create', (done) => {
    const spy = sinon.stub(client.transport, 'post').returns(Promise.resolve());
    expect(client.create).to.exist;
    expect(client.create).to.an.instanceOf(Function);

    const request: CreateStreamRequest = {
      dataSet: {
        name: 'test-ds',
        description: 'test-description',
        schema: { columns: [{ name: 'col1', type: 'STRING' }] },
      },
      updateMethod: UPDATE_METHODS[UPDATE_METHODS.UPDATE],
    };

    const promise = client.create(request);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args).to.include(client.type);
      expect(spy.firstCall.args[0]).to.have.all.keys('url', 'body');
      expect(spy.firstCall.args[0].url).to.equal(client.urlBase);
      expect(spy.firstCall.args[0].body).to.equal(request);
      done();
    });
  });

  it('should get', (done) => {
    const spy = sinon.stub(client.transport, 'get').returns(Promise.resolve());
    expect(client.get).to.exist;
    expect(client.get).to.an.instanceOf(Function);

    const promise = client.get(1, ['id', 'dataset']);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.all.keys('url', 'params');
      expect(spy.firstCall.args[0].url).to.equal(`${client.urlBase}/1`);
      expect(spy.firstCall.args[0].params).to.have.property('fields', 'id,dataset');
      expect(spy.firstCall.args).to.include(client.type);
      done();
    });
  });

  it('should list', (done) => {
    const spy = sinon.stub(client.transport, 'get').returns(Promise.resolve());
    expect(client.list).to.exist;
    expect(client.list).to.an.instanceOf(Function);

    const promise = client.list(['all']);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args).to.include(client.type);
      expect(spy.firstCall.args[0].url).to.equal(client.urlBase);
      expect(spy.firstCall.args[0].params).to.have.property('fields', 'all');
      done();
    });
  });

  it('should update', (done) => {
    const spy = sinon.stub(client.transport, 'patch').returns(Promise.resolve());
    expect(client.update).to.exist;
    expect(client.update).to.an.instanceOf(Function);

    const updateMethod = UPDATE_METHODS[UPDATE_METHODS.REPLACE];
    const update: UpdateStreamRequest = { updateMethod };

    const promise = client.update(1, update);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0].url).to.equal(`${client.urlBase}/1`);
      expect(spy.firstCall.args[0].body).to.have.property('updateMethod', updateMethod);
      expect(spy.firstCall.args).to.include(client.type);
      done();
    });
  });

  it('should delete', (done) => {
    const spy = sinon.stub(client.transport, 'delete').returns(Promise.resolve());
    expect(client.delete).to.exist;
    expect(client.delete).to.an.instanceOf(Function);

    const promise = client.delete(1);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0].url).to.equal(`${client.urlBase}/1`);
      expect(spy.firstCall.args[1]).to.equal(client.type);
      done();
    });
  });

  it('should search', (done) => {
    const spy = sinon.stub(client.transport, 'get').returns(Promise.resolve());
    expect(client.search).to.exist;
    expect(client.search).to.an.instanceOf(Function);

    const promise = client.search(['dataSource.name:test'], ['all']);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args).to.include(client.type);
      expect(spy.firstCall.args[0]).to.have.all.keys('url', 'params');
      expect(spy.firstCall.args[0].url).to.equal(`${client.urlBase}/search`);
      expect(spy.firstCall.args[0].params).to.have.property('q', 'dataSource.name:test');
      expect(spy.firstCall.args[0].params).to.have.property('fields', 'all');
      done();
    });
  });

  describe('Executions:', () => {
    it('should create', (done) => {
      const spy = sinon.stub(client.transport, 'post').returns(Promise.resolve());
      expect(client.createExecution).to.exist;
      expect(client.createExecution).to.an.instanceOf(Function);

      const promise = client.createExecution(1);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0].url).to.equal(`${client.urlBase}/1/executions`);
        expect(spy.firstCall.args[1]).to.equal(client.execType);
        done();
      });
    });

    it('should get', (done) => {
      const spy = sinon.stub(client.transport, 'get').returns(Promise.resolve());
      expect(client.getExecution).to.exist;
      expect(client.getExecution).to.an.instanceOf(Function);

      const promise = client.getExecution(1, 2);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0].url).to.equal(`${client.urlBase}/1/executions/2`);
        expect(spy.firstCall.args[1]).to.equal(client.execType);
        done();
      });
    });

    it('should list', (done) => {
      const spy = sinon.stub(client.transport, 'get').returns(Promise.resolve());
      expect(client.listExecutions).to.exist;
      expect(client.listExecutions).to.an.instanceOf(Function);

      const promise = client.listExecutions(1, 5, 0);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args).to.include(client.execType);
        expect(spy.firstCall.args[0].url).to.equal(`${client.urlBase}/1/executions`);
        expect(spy.firstCall.args[0].params).to.have.property('limit', 5);
        expect(spy.firstCall.args[0].params).to.have.property('offset', 0);
        done();
      });
    });

    it('should upload data part', (done) => {
      const spy = sinon.stub(client.transport, 'put').returns(Promise.resolve());
      expect(client.uploadPart).to.exist;
      expect(client.uploadPart).to.an.instanceOf(Function);

      const csv = 'csv,to,import';
      const promise = client.uploadPart(1, 2, 3, csv);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0].url).to.equal(`${client.urlBase}/1/executions/2/part/3`);
        expect(spy.firstCall.args[0].body).to.equal(csv);
        expect(spy.firstCall.args[0].headers).to.have.property('Content-Type', 'text/csv');
        expect(spy.firstCall.args).to.include(client.execType);
        done();
      });
    });

    it('should upload compressed data part', (done) => {
      const spy = sinon.stub(client.transport, 'put').returns(Promise.resolve());
      expect(client.uploadPart).to.exist;
      expect(client.uploadPart).to.an.instanceOf(Function);

      const gzip = 'gzip string';
      const promise = client.uploadCompressedPart(1, 2, 3, gzip);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0].url).to.equal(`${client.urlBase}/1/executions/2/part/3`);
        expect(spy.firstCall.args[0].body).to.equal(gzip);
        expect(spy.firstCall.args[0].headers).to.have.property('Content-Type', 'application/gzip');
        expect(spy.firstCall.args).to.include(client.execType);
        done();
      });
    });

    it('should commit', (done) => {
      const spy = sinon.stub(client.transport, 'put').returns(Promise.resolve());
      expect(client.commit).to.exist;
      expect(client.commit).to.an.instanceOf(Function);

      const promise = client.commit(1, 2);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0].url).to.equal(`${client.urlBase}/1/executions/2/commit`);
        expect(spy.firstCall.args).to.include(client.execType);
        done();
      });
    });

    it('should abort', (done) => {
      const spy = sinon.stub(client.transport, 'put').returns(Promise.resolve());
      expect(client.abort).to.exist;
      expect(client.abort).to.an.instanceOf(Function);

      const promise = client.abort(1, 2);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0].url).to.equal(`${client.urlBase}/1/executions/2/abort`);
        expect(spy.firstCall.args).to.include(client.execType);
        done();
      });
    });

    it('should abort current execution', (done) => {
      const spy = sinon.stub(client.transport, 'put').returns(Promise.resolve());
      expect(client.abort).to.exist;
      expect(client.abort).to.an.instanceOf(Function);

      const promise = client.abort(1);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0].url).to.equal(`${client.urlBase}/1/executions/abort`);
        expect(spy.firstCall.args).to.include(client.execType);
        done();
      });
    });
  });
});
