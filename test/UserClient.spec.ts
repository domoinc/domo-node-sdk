import * as sinon from 'sinon';
import { expect } from 'chai';

import UserClient from '../src/users/UserClient';
import { User } from '../src/users/models';
import Transport from '../src/common/Transport';
import { API_SCOPE, ROLES } from '../src/common/Constants';

describe('(Client): User', () => {
  let client;

  beforeEach(() => {
    const transport = new Transport('test', 'test', [API_SCOPE.USER], 'api.domo.com');
    client = new UserClient(transport);
  });

  it('should instantiate', () => {
    expect(UserClient).to.exist;
    expect(client).to.be.an.instanceOf(UserClient);
  });

  it('should have correct URL base', () => {
    expect(client.urlBase).to.equal('/v1/users');
  });

  it('should create', (done) => {
    const spy = sinon.stub(client.transport, 'post').returns(Promise.resolve());
    expect(client.create).to.exist;
    expect(client.create).to.an.instanceOf(Function);

    const user: User = {
      name: 'Luke Skywalker',
      email: 'luke@jedi.org',
      role: ROLES[ROLES.Admin],
    };

    const promise = client.create(user, true);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', client.urlBase);
      expect(spy.firstCall.args[0]).to.have.property('body', user);
      expect(spy.firstCall.args[0].params).to.have.property('sendInvite', true);
      expect(spy.firstCall.args).to.include(client.type);
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
      expect(spy.firstCall.args).to.include(client.type);
      done();
    });
  });

  it('should list', (done) => {
    const spy = sinon.stub(client.transport, 'get').returns(Promise.resolve());
    expect(client.list).to.exist;
    expect(client.list).to.an.instanceOf(Function);

    const limit = 5;
    const offset = 0;
    const promise = client.list(limit, offset);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args).to.include(client.type);
      expect(spy.firstCall.args[0]).to.have.property('url', client.urlBase);
      expect(spy.firstCall.args[0].params).to.have.property('limit', limit);
      expect(spy.firstCall.args[0].params).to.have.property('offset', offset);
      done();
    });
  });

  it('should update', (done) => {
    const spy = sinon.stub(client.transport, 'put').returns(Promise.resolve());
    expect(client.update).to.exist;
    expect(client.update).to.an.instanceOf(Function);

    const user: User = {
      name: 'Darth Vader',
      email: 'new.email@sith.co',
      role: ROLES[ROLES.Participant],
    };

    const promise = client.update(1, user);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1`);
      expect(spy.firstCall.args[0]).to.have.property('body', user);
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
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1`);
      expect(spy.firstCall.args).to.include(client.type);
      done();
    });
  });
});
