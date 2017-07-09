import * as sinon from 'sinon';
import { expect } from 'chai';

import Transport from '../src/common/Transport';
import { HTTP_METHODS, API_SCOPE, FILTER_OPERATORS } from '../src/common/Constants';
import PDPClient from '../src/datasets/PDPClient';
import { Policy } from '../src/datasets/models';

describe('(Client): PDP', () => {
  let client;

  beforeEach(() => {
    const transport = new Transport('test', 'test', [API_SCOPE.USER], 'api.domo.com');
    client = new PDPClient(transport);
  });

  it('should instantiate', () => {
    expect(PDPClient).to.exist;
    expect(client).to.be.an.instanceOf(PDPClient);
  });

  it('should have correct URL base', () => {
    expect(client.urlBase).to.equal('/v1/datasets');
  });

  it('should create', (done) => {
    const spy = sinon.stub(client.transport, 'post').returns(Promise.resolve());
    expect(client.create).to.exist;
    expect(client.create).to.an.instanceOf(Function);

    const pdp: Policy = {
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

    const promise = client.create('1', pdp);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/policies`);
      expect(spy.firstCall.args[0]).to.have.property('body', pdp);
      expect(spy.firstCall.args).to.include(client.type);
      done();
    });
  });

  it('should get', (done) => {
    const spy = sinon.stub(client.transport, 'get').returns(Promise.resolve());
    expect(client.get).to.exist;
    expect(client.get).to.an.instanceOf(Function);

    const promise = client.get('1', 2);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/policies/2`);
      expect(spy.firstCall.args).to.include(client.type);
      done();
    });
  });

  it('should list', (done) => {
    const spy = sinon.stub(client.transport, 'get').returns(Promise.resolve());
    expect(client.list).to.exist;
    expect(client.list).to.an.instanceOf(Function);

    const promise = client.list('1');
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/policies`);
      expect(spy.firstCall.args).to.include(client.type);
      done();
    });
  });

  it('should update', (done) => {
    const spy = sinon.stub(client.transport, 'put').returns(Promise.resolve());
    expect(client.update).to.exist;
    expect(client.update).to.an.instanceOf(Function);

    const pdp: Policy = { name: 'test' };
    const promise = client.update('1', 2, pdp);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/policies/2`);
      expect(spy.firstCall.args[0]).to.have.property('body', pdp);
      expect(spy.firstCall.args).to.include(client.type);
      done();
    });
  });

  it('should delete', (done) => {
    const spy = sinon.stub(client.transport, 'delete').returns(Promise.resolve());
    expect(client.delete).to.exist;
    expect(client.delete).to.an.instanceOf(Function);

    const promise = client.delete('1', 2);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/policies/2`);
      expect(spy.firstCall.args[1]).to.equal(client.type);
      done();
    });
  });
});
