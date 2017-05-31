/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const expect = require('chai').expect;

const DomoAPIClient = require('./domo-api');
const TransportClient = require('../transport');
const HTTPMethod = require('../constants').HTTPMethod;

describe('(Base): DomoAPIClient', () => {
  let transport;
  let client;

  beforeEach(done => {
    transport = new TransportClient('test', 'test');
    client = new DomoAPIClient(transport);
    done();
  });

  it('should instantiate', done => {
    expect(DomoAPIClient).to.exist;
    expect(DomoAPIClient).to.be.an.instanceOf(Function);
    done();
  });

  it('should require a transport client', done => {
    try {
      const newClient = new DomoAPIClient();
      expect(newClient).to.not.exist;
    } catch (err) {
      expect(err).to.exist;
      expect(err.name).to.equal('DomoAPIClientError');
      expect(err.message).to.equal('TransportClient is required');
      done();
    }
  });

  it('should have REST methods', done => {
    const expectedFunctions = ['_create', '_get', '_list', '_update', '_delete'];

    expectedFunctions.forEach(fn => {
      expect(client[fn]).to.exist;
      expect(client[fn]).to.be.an.instanceOf(Function);
    });

    done();
  });

  it('should validateAccessToken each time', done => {
    const spy = sinon.stub(transport, 'validateAccessToken').returns(Promise.reject());
    const expectedFunctions = ['_create', '_get', '_list', '_update', '_delete'];

    const promises = expectedFunctions.map(fn => client[fn]().catch(() => {}));
    Promise.all(promises).then(() => {
      expect(spy.callCount).to.be.equal(expectedFunctions.length);
      spy.restore();
      done();
    });
  });

  it('_create should make POST request', done => {
    sinon.stub(transport, 'validateAccessToken').returns(Promise.resolve());
    const spy = sinon.stub(transport, 'post').returns(Promise.resolve());

    const url = 'test.com';
    const body = { body: 'test' };
    const params = { param1: 'test' };
    const obj = 'testObj';


    client._create(url, body, params, obj).then(() => {
      expect(spy.calledOnce).to.be.true;

      const args = spy.getCall(0).args[0];
      expect(args).to.have.property('url', url);
      expect(args).to.have.property('body', body);
      expect(args).to.have.property('params', params);
      done();
    });
  });

  it('_get should make GET request', done => {
    sinon.stub(transport, 'validateAccessToken').returns(Promise.resolve());
    const spy = sinon.stub(transport, 'get').returns(Promise.resolve());

    const url = 'test.com';
    const params = { param1: 'test' };
    const headers = { param1: 'test' };
    const obj = 'testObj';


    client._get(url, params, headers, obj).then(() => {
      expect(spy.calledOnce).to.be.true;

      const args = spy.getCall(0).args[0];
      expect(args).to.have.property('url', url);
      expect(args).to.have.property('params', params);
      expect(args).to.have.property('headers', headers);
      done();
    });
  });

  it('_list should make GET request', done => {
    sinon.stub(transport, 'validateAccessToken').returns(Promise.resolve());
    const spy = sinon.stub(transport, 'get').returns(Promise.resolve());

    const url = 'test.com';
    const params = { param1: 'test' };
    const obj = 'testObj';


    client._get(url, params, obj).then(() => {
      expect(spy.calledOnce).to.be.true;

      const args = spy.getCall(0).args[0];
      expect(args).to.have.property('url', url);
      expect(args).to.have.property('params', params);
      done();
    });
  });

  it('_update should make PUT request', done => {
    sinon.stub(transport, 'validateAccessToken').returns(Promise.resolve());
    const spy = sinon.stub(transport, 'put').returns(Promise.resolve());

    const url = 'test.com';
    const method = HTTPMethod.PUT;
    const headers = {};
    const body = { body: 'test' };
    const isJson = true;
    const obj = 'testObj';


    client._update(url, method, headers, body, isJson, obj).then(() => {
      expect(spy.calledOnce).to.be.true;

      const args1 = spy.getCall(0).args[0];
      const args2 = spy.getCall(0).args[1];
      expect(args1).to.have.property('url', url);
      expect(args1).to.have.property('body', body);
      expect(args1).to.have.property('headers', headers);
      expect(args2).to.be.true;
      done();
    });
  });

  it('_update should make PATCH request', done => {
    sinon.stub(transport, 'validateAccessToken').returns(Promise.resolve());
    const spy = sinon.stub(transport, 'patch').returns(Promise.resolve());

    const url = 'test.com';
    const method = HTTPMethod.PATCH;
    const headers = {};
    const body = { body: 'test' };
    const isJson = true;
    const obj = 'testObj';


    client._update(url, method, headers, body, isJson, obj).then(() => {
      expect(spy.calledOnce).to.be.true;

      const args1 = spy.getCall(0).args[0];
      const args2 = spy.getCall(0).args[1];
      expect(args1).to.have.property('url', url);
      expect(args1).to.have.property('body', body);
      expect(args1).to.have.property('headers', headers);
      expect(args2).to.be.true;
      done();
    });
  });

  it('_delete should make DELETE request', done => {
    sinon.stub(transport, 'validateAccessToken').returns(Promise.resolve());
    const spy = sinon.stub(transport, 'delete').returns(Promise.resolve());

    const url = 'test.com';
    const obj = 'testObj';

    client._delete(url, obj).then(() => {
      expect(spy.calledOnce).to.be.true;

      const args = spy.getCall(0).args[0];
      expect(args).to.have.property('url', url);
      done();
    });
  });
});
