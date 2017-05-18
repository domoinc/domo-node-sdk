/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const expect = require('chai').expect;

const DatasetClient = require('./dataset-client');
const TransportClient = require('../common/transport');
const HTTPMethod = require('../common/constants').HTTPMethod;

describe('(Client): Dataset', () => {
  let client;

  beforeEach(done => {
    const transport = new TransportClient('test', 'test');
    client = new DatasetClient(transport);
    done();
  });

  it('should instantiate', done => {
    expect(DatasetClient).to.exist;
    expect(client).to.be.an.instanceOf(DatasetClient);
    done();
  });

  it('should require a transport', done => {
    try {
      const newClient = new DatasetClient();
      expect(newClient).to.not.exist;
    } catch (err) {
      expect(err).to.exist;
      expect(err.name).to.equal('DomoAPIClientError');
      done();
    }
  });

  it('should have correct URL base', done => {
    expect(client.urlBase).to.equal('/v1/datasets');
    done();
  });

  it('should create', done => {
    const spy = sinon.stub(client, '_create').returns(Promise.resolve());
    expect(client.create).to.exist;
    expect(client.create).to.an.instanceOf(Function);

    const promise = client.create({});
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args).to.include(client.urlBase, {}, {}, client.clientDesc);
      done();
    });
  });

  it('should get', done => {
    const spy = sinon.stub(client, '_get').returns(Promise.resolve());
    expect(client.get).to.exist;
    expect(client.get).to.an.instanceOf(Function);

    const promise = client.get(1);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1`);
      expect(spy.firstCall.args).to.include({}, client.clientDesc);
      done();
    });
  });

  it('should list', done => {
    const spy = sinon.stub(client, '_list').returns(Promise.resolve());
    expect(client.list).to.exist;
    expect(client.list).to.an.instanceOf(Function);

    const promise = client.list('sort', 1, 0);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args).to.include(client.urlBase, client.clientDesc);
      expect(spy.firstCall.args[1]).to.have.property('sort', 'sort');
      expect(spy.firstCall.args[1]).to.have.property('limit', 1);
      expect(spy.firstCall.args[1]).to.have.property('offset', 0);
      done();
    });
  });

  it('should update', done => {
    const spy = sinon.stub(client, '_update').returns(Promise.resolve());
    expect(client.update).to.exist;
    expect(client.update).to.an.instanceOf(Function);

    const dataset = {};
    const promise = client.update(1, dataset);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1`);
      expect(spy.firstCall.args).to.include(HTTPMethod.PUT, dataset, client.clientDesc);
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

  it('should import csv data', done => {
    const spy = sinon.stub(client, '_update').returns(Promise.resolve());
    expect(client.importData).to.exist;
    expect(client.importData).to.an.instanceOf(Function);

    const promise = client.importData(1, 'example,csv,here');
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1/data`);
      expect(spy.firstCall.args).to.include(HTTPMethod.PUT, 'example,csv,here', false, client.clientDesc);
      expect(spy.firstCall.args[2]).to.have.property('Content-Type', 'text/csv');
      done();
    });
  });

  it('should export csv data', done => {
    const spy = sinon.stub(client, '_get').returns(Promise.resolve());
    expect(client.exportData).to.exist;
    expect(client.exportData).to.an.instanceOf(Function);

    const promise = client.exportData(1, true);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1/data`);
      expect(spy.firstCall.args[1]).to.have.property('includeHeader', true);
      expect(spy.firstCall.args[1]).to.have.property('fileName');
      expect(spy.firstCall.args[2]).to.have.property('Accept', 'text/csv');
      expect(spy.firstCall.args).to.include(client.clientDesc);
      done();
    });
  });

  describe('PDP:', () => {
    it('should create', done => {
      const spy = sinon.stub(client, '_create').returns(Promise.resolve());
      expect(client.createPDP).to.exist;
      expect(client.createPDP).to.an.instanceOf(Function);

      const pdp = {};
      const promise = client.createPDP(1, pdp);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args).to.include(`${client.urlBase}/1/policies`, pdp, client.pdpDesc);
        done();
      });
    });

    it('should get', done => {
      const spy = sinon.stub(client, '_get').returns(Promise.resolve());
      expect(client.getPDP).to.exist;
      expect(client.getPDP).to.an.instanceOf(Function);

      const promise = client.getPDP(1, 2);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args).to.include(`${client.urlBase}/1/policies/2`, client.pdpDesc);
        done();
      });
    });

    it('should list', done => {
      const spy = sinon.stub(client, '_list').returns(Promise.resolve());
      expect(client.listPDP).to.exist;
      expect(client.listPDP).to.an.instanceOf(Function);

      const promise = client.listPDP(1);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args).to.include(`${client.urlBase}/1/policies`, client.pdpDesc);
        done();
      });
    });

    it('should update', done => {
      const spy = sinon.stub(client, '_update').returns(Promise.resolve());
      expect(client.updatePDP).to.exist;
      expect(client.updatePDP).to.an.instanceOf(Function);

      const pdp = { name: 'test' };
      const promise = client.updatePDP(1, 2, pdp);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1/policies/2`);
        expect(spy.firstCall.args).to.include(HTTPMethod.PUT, pdp, client.pdpDesc);
        done();
      });
    });

    it('should delete', done => {
      const spy = sinon.stub(client, '_delete').returns(Promise.resolve());
      expect(client.deletePDP).to.exist;
      expect(client.deletePDP).to.an.instanceOf(Function);

      const promise = client.deletePDP(1, 2);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1/policies/2`);
        expect(spy.firstCall.args[1]).to.equal(client.pdpDesc);
        done();
      });
    });
  });
});
