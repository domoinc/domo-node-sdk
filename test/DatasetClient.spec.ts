import * as sinon from 'sinon';
import { expect } from 'chai';

import Transport from '../src/common/Transport';
import { HTTP_METHODS, API_SCOPE, FILTER_OPERATORS } from '../src/common/Constants';
import DatasetClient from '../src/datasets/DatasetClient';
import { DataSet, Policy } from '../src/datasets/models';

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

    const dataset: DataSet = {
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

    const limit = 1;
    const offset = 0;
    const sort = 'name';
    const promise = client.list(limit, offset, sort);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', client.urlBase);
      expect(spy.firstCall.args[0].params).to.have.property('limit', limit);
      expect(spy.firstCall.args[0].params).to.have.property('offset', offset);
      expect(spy.firstCall.args[0].params).to.have.property('sort', sort);
      expect(spy.firstCall.args[1]).to.equal(client.type);
      done();
    });
  });

  it('should update', (done) => {
    const spy = sinon.stub(client.transport, 'put').returns(Promise.resolve());
    expect(client.update).to.exist;
    expect(client.update).to.an.instanceOf(Function);

    const dataset: DataSet = { name: 'test-update' };
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

  it('should import and replce csv data', (done) => {
    const spy = sinon.stub(client.transport, 'put').returns(Promise.resolve());
    expect(client.importData).to.exist;
    expect(client.importData).to.an.instanceOf(Function);

    const csv = 'example,csv,here';
    const promise = client.importData(1, csv);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/data?updateMethod=REPLACE`);
      expect(spy.firstCall.args[0]).to.have.property('body', csv);
      expect(spy.firstCall.args[0].headers).to.have.property('Content-Type', 'text/csv');
      expect(spy.firstCall.args[1]).to.equal(client.type);
      done();
    });
  });

  it('should import and append csv data', (done) => {
    const spy = sinon.stub(client.transport, 'put').returns(Promise.resolve());
    expect(client.importData).to.exist;
    expect(client.importData).to.an.instanceOf(Function);

    const csv = 'example,csv,here';
    const promise = client.importData(1, csv, true);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/data?updateMethod=APPEND`);
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
});
