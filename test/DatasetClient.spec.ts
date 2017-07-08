import * as sinon from 'sinon';
import { expect } from 'chai';

import Transport from '../src/common/Transport';
import { HTTP_METHODS, API_SCOPE, FILTER_OPERATORS } from '../src/common/Constants';
import DatasetClient from '../src/datasets/DatasetClient';
import {
  CreateDatasetRequest,
  UpdateDatasetRequest,
  ListDatasetRequest,
  CreatePolicyRequest,
  UpdatePolicyRequest,
} from '../src/datasets/models';

describe('(Client): Dataset', () => {
  let client;

  beforeEach((done) => {
    const transport = new Transport('test', 'test', [API_SCOPE.USER], 'api.domo.com');
    client = new DatasetClient(transport);
    done();
  });

  it('should instantiate', () => {
    expect(DatasetClient).to.exist;
    expect(client).to.be.an.instanceOf(DatasetClient);
  });

  it('should have correct URL base', () => {
    expect(client.urlBase).to.equal('/v1/datasets');
  });

  it('should create', (done) => {
    const spy = sinon.stub(client.transport, 'post').returns(Promise.resolve());
    expect(client.create).to.exist;
    expect(client.create).to.an.instanceOf(Function);

    const dataset: CreateDatasetRequest = {
      name: 'test',
      description: 'created by test',
      schema: { columns: [{ name: 'col1', type: 'STRING' }] },
    };

    const promise = client.create(dataset);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', client.urlBase);
      expect(spy.firstCall.args[0]).to.have.property('body', dataset);
      expect(spy.firstCall.args[1]).to.equal(client.type);
      done();
    });
  });

  it('should get', (done) => {
    const spy = sinon.stub(client.transport, 'get').returns(Promise.resolve());
    expect(client.get).to.exist;
    expect(client.get).to.an.instanceOf(Function);

    const promise = client.get(1);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1`);
      expect(spy.firstCall.args[1]).to.equal(client.type);
      done();
    });
  });

  it('should list', (done) => {
    const spy = sinon.stub(client.transport, 'get').returns(Promise.resolve());
    expect(client.list).to.exist;
    expect(client.list).to.an.instanceOf(Function);

    const request: ListDatasetRequest = {
      sort: 'name',
      limit: 1,
      offset: 0,
    };

    const promise = client.list(request);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', client.urlBase);
      expect(spy.firstCall.args[0]).to.have.property('params', request);
      expect(spy.firstCall.args[1]).to.equal(client.type);
      done();
    });
  });

  it('should update', (done) => {
    const spy = sinon.stub(client.transport, 'put').returns(Promise.resolve());
    expect(client.update).to.exist;
    expect(client.update).to.an.instanceOf(Function);

    const dataset: UpdateDatasetRequest = { name: 'test-update' };
    const promise = client.update(1, dataset);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1`);
      expect(spy.firstCall.args[0]).to.have.property('body', dataset);
      expect(spy.firstCall.args[1]).to.equal(client.type);
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
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1`);
      expect(spy.firstCall.args[1]).to.equal(client.type);
      done();
    });
  });

  it('should import csv data', (done) => {
    const spy = sinon.stub(client.transport, 'put').returns(Promise.resolve());
    expect(client.importData).to.exist;
    expect(client.importData).to.an.instanceOf(Function);

    const csv = 'example,csv,here';
    const promise = client.importData(1, csv);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/data`);
      expect(spy.firstCall.args[0]).to.have.property('body', csv);
      expect(spy.firstCall.args[0].headers).to.have.property('Content-Type', 'text/csv');
      expect(spy.firstCall.args[1]).to.equal(client.type);
      done();
    });
  });

  it('should export csv data', (done) => {
    const spy = sinon.stub(client.transport, 'get').returns(Promise.resolve());
    expect(client.exportData).to.exist;
    expect(client.exportData).to.an.instanceOf(Function);

    const promise = client.exportData(1);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/data`);
      expect(spy.firstCall.args[0].params).to.have.property('includeHeader', false);
      expect(spy.firstCall.args[0].params).to.have.property('fileName');
      expect(spy.firstCall.args[0].headers).to.have.property('Accept', 'text/csv');
      expect(spy.firstCall.args).to.include(client.type);
      done();
    });
  });

  describe('PDP:', () => {
    it('should create', (done) => {
      const spy = sinon.stub(client.transport, 'post').returns(Promise.resolve());
      expect(client.createPDP).to.exist;
      expect(client.createPDP).to.an.instanceOf(Function);

      const pdp: CreatePolicyRequest = {
        name: 'test-policy',
        type: 'user',
        users: [1],
        groups: [],
        filters: [{
          column: 'col1',
          values: ['hello'],
          not: true,
          operator: FILTER_OPERATORS[FILTER_OPERATORS.EQUALS],
        }],
      };

      const promise = client.createPDP(1, pdp);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/policies`);
        expect(spy.firstCall.args[0]).to.have.property('body', pdp);
        expect(spy.firstCall.args).to.include(client.pdpType);
        done();
      });
    });

    it('should get', (done) => {
      const spy = sinon.stub(client.transport, 'get').returns(Promise.resolve());
      expect(client.getPDP).to.exist;
      expect(client.getPDP).to.an.instanceOf(Function);

      const promise = client.getPDP(1, 2);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/policies/2`);
        expect(spy.firstCall.args).to.include(client.pdpType);
        done();
      });
    });

    it('should list', (done) => {
      const spy = sinon.stub(client.transport, 'get').returns(Promise.resolve());
      expect(client.listPDP).to.exist;
      expect(client.listPDP).to.an.instanceOf(Function);

      const promise = client.listPDP(1);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/policies`);
        expect(spy.firstCall.args).to.include(client.pdpType);
        done();
      });
    });

    it('should update', (done) => {
      const spy = sinon.stub(client.transport, 'put').returns(Promise.resolve());
      expect(client.updatePDP).to.exist;
      expect(client.updatePDP).to.an.instanceOf(Function);

      const pdp: UpdatePolicyRequest = { name: 'test' };
      const promise = client.updatePDP(1, 2, pdp);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/policies/2`);
        expect(spy.firstCall.args[0]).to.have.property('body', pdp);
        expect(spy.firstCall.args).to.include(client.pdpType);
        done();
      });
    });

    it('should delete', (done) => {
      const spy = sinon.stub(client.transport, 'delete').returns(Promise.resolve());
      expect(client.deletePDP).to.exist;
      expect(client.deletePDP).to.an.instanceOf(Function);

      const promise = client.deletePDP(1, 2);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/policies/2`);
        expect(spy.firstCall.args[1]).to.equal(client.pdpType);
        done();
      });
    });
  });
});
