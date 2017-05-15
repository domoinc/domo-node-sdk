/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import { expect } from 'chai';

import StreamClient from './stream-client';
import TransportClient from '../common/transport';
import { UpdateMethod, HTTPMethod } from '../common/constants';

describe('(Client): Stream', () => {
  let client;

  beforeEach(done => {
    const transport = new TransportClient('test', 'test');
    client = new StreamClient(transport);
    done();
  });

  it('should instantiate', done => {
    expect(StreamClient).to.exist;
    expect(client).to.be.an.instanceOf(StreamClient);
    done();
  });

  it('should require a transport', done => {
    try {
      const newClient = new StreamClient();
      expect(newClient).to.not.exist;
    } catch (err) {
      expect(err).to.exist;
      expect(err.name).to.equal('DomoAPIClientError');
      done();
    }
  });

  it('should have correct URL base', done => {
    expect(client.urlBase).to.equal('/v1/streams');
    done();
  });

  it('should create', done => {
    const spy = sinon.stub(client, '_create').returns(Promise.resolve());
    expect(client.create).to.exist;
    expect(client.create).to.an.instanceOf(Function);

    const dataset = {};
    const promise = client.create(dataset, UpdateMethod.REPLACE);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args).to.include(client.urlBase, {}, client.clientDesc);
      expect(spy.firstCall.args[1]).to.have.property('updateMethod', UpdateMethod.REPLACE);
      expect(spy.firstCall.args[1]).to.have.property('dataSet', dataset);
      done();
    });
  });

  it('should get', done => {
    const spy = sinon.stub(client, '_get').returns(Promise.resolve());
    expect(client.get).to.exist;
    expect(client.get).to.an.instanceOf(Function);

    const promise = client.get(1, 'all');
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1`);
      expect(spy.firstCall.args[1]).to.have.property('fields', 'all');
      expect(spy.firstCall.args).to.include(client.clientDesc);
      done();
    });
  });

  it('should list', done => {
    const spy = sinon.stub(client, '_list').returns(Promise.resolve());
    expect(client.list).to.exist;
    expect(client.list).to.an.instanceOf(Function);

    const promise = client.list('all');
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args).to.include(client.urlBase, client.clientDesc);
      expect(spy.firstCall.args[1]).to.have.property('fields', 'all');
      done();
    });
  });

  it('should update', done => {
    const spy = sinon.stub(client, '_update').returns(Promise.resolve());
    expect(client.update).to.exist;
    expect(client.update).to.an.instanceOf(Function);

    const promise = client.update(1, { updateMethod: UpdateMethod.REPLACE });
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1`);
      expect(spy.firstCall.args).to.include(HTTPMethod.PATCH, client.clientDesc);
      expect(spy.firstCall.args[3]).to.have.property('updateMethod', UpdateMethod.REPLACE);
      done();
    });
  });

  it('should delete', done => {
    const spy = sinon.stub(client, '_delete').returns(Promise.resolve());
    expect(client.delete).to.exist;
    expect(client.delete).to.an.instanceOf(Function);

    const promise = client.delete(1);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1`);
      expect(spy.firstCall.args[1]).to.equal(client.clientDesc);
      done();
    });
  });

  it('should search', done => {
    const spy = sinon.stub(client, '_get').returns(Promise.resolve());
    expect(client.search).to.exist;
    expect(client.search).to.an.instanceOf(Function);

    const promise = client.search('dataSource.name:test', 'all');
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args).to.include(`${client.urlBase}/search`, client.clientDesc);
      expect(spy.firstCall.args[1]).to.have.property('q', 'dataSource.name:test');
      expect(spy.firstCall.args[1]).to.have.property('fields');
      done();
    });
  });

  describe('Executions:', () => {
    it('should create', done => {
      const spy = sinon.stub(client, '_create').returns(Promise.resolve());
      expect(client.createExecution).to.exist;
      expect(client.createExecution).to.an.instanceOf(Function);

      const promise = client.createExecution(1);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args).to.include(`${client.urlBase}/1/executions`, client.clientExecDesc);
        done();
      });
    });

    it('should get', done => {
      const spy = sinon.stub(client, '_get').returns(Promise.resolve());
      expect(client.getExecution).to.exist;
      expect(client.getExecution).to.an.instanceOf(Function);

      const promise = client.getExecution(1, 2);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args).to.include(`${client.urlBase}/1/executions/2`, client.clientDesc);
        done();
      });
    });

    it('should list', done => {
      const spy = sinon.stub(client, '_list').returns(Promise.resolve());
      expect(client.listExecutions).to.exist;
      expect(client.listExecutions).to.an.instanceOf(Function);

      const promise = client.listExecutions(1, 5, 0);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args).to.include(`${client.urlBase}/1/executions`, client.clientDesc);
        expect(spy.firstCall.args[1]).to.have.property('limit', 5);
        expect(spy.firstCall.args[1]).to.have.property('offset', 0);
        done();
      });
    });

    it('should upload data part', done => {
      const spy = sinon.stub(client, '_update').returns(Promise.resolve());
      expect(client.uploadPart).to.exist;
      expect(client.uploadPart).to.an.instanceOf(Function);

      const promise = client.uploadPart(1, 2, 3, 'csv,to,import');
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1/executions/2/part/3`);
        expect(spy.firstCall.args).to.include(HTTPMethod.PUT, 'csv,to,import', false, client.clientDesc);
        expect(spy.firstCall.args[2]).to.have.property('Content-Type', 'text/csv');
        done();
      });
    });

    it('should commit', done => {
      const spy = sinon.stub(client, '_update').returns(Promise.resolve());
      expect(client.commit).to.exist;
      expect(client.commit).to.an.instanceOf(Function);

      const promise = client.commit(1, 2);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1/executions/2/commit`);
        expect(spy.firstCall.args).to.include(HTTPMethod.PUT, client.clientDesc);
        done();
      });
    });

    it('should abort', done => {
      const spy = sinon.stub(client, '_update').returns(Promise.resolve());
      expect(client.abort).to.exist;
      expect(client.abort).to.an.instanceOf(Function);

      const promise = client.abort(1, 2);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1/executions/2/abort`);
        expect(spy.firstCall.args).to.include(HTTPMethod.PUT, client.clientDesc);
        done();
      });
    });

    it('should abort current execution', done => {
      const spy = sinon.stub(client, '_update').returns(Promise.resolve());
      expect(client.abort).to.exist;
      expect(client.abort).to.an.instanceOf(Function);

      const promise = client.abort(1);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1/executions/abort`);
        expect(spy.firstCall.args).to.include(HTTPMethod.PUT, client.clientDesc);
        done();
      });
    });
  });
});
