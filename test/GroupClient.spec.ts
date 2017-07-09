import * as sinon from 'sinon';
import { expect } from 'chai';

import GroupClient from '../src/groups/GroupClient';
import Transport from '../src/common/Transport';
import { HTTP_METHODS, API_SCOPE } from '../src/common/Constants';
import { Group } from '../src/groups/models';

describe('(Client): Group', () => {
  let client;

  beforeEach(() => {
    const transport = new Transport('test', 'test', [API_SCOPE.USER], 'api.domo.com');
    client = new GroupClient(transport);
  });

  it('should instantiate', () => {
    expect(GroupClient).to.exist;
    expect(client).to.be.an.instanceOf(GroupClient);
  });

  it('should have correct URL base', () => {
    expect(client.urlBase).to.equal('/v1/groups');
  });

  it('should create', (done) => {
    const spy = sinon.stub(client.transport, 'post').returns(Promise.resolve());
    expect(client.create).to.exist;
    expect(client.create).to.an.instanceOf(Function);

    const group: Group = {
      name: 'group1',
      default: false,
    };

    const promise = client.create(group);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', client.urlBase);
      expect(spy.firstCall.args[0]).to.have.property('body', group);
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

    const group: Group = { name: 'new-name', active: false };
    const promise = client.update(1, group);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1`);
      expect(spy.firstCall.args[0]).to.have.property('body', group);
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
      expect(spy.firstCall.args[1]).to.equal(client.type);
      done();
    });
  });

  describe('Membership:', () => {
    it('should add user', (done) => {
      const spy = sinon.stub(client.transport, 'put').returns(Promise.resolve());
      expect(client.addUser).to.exist;
      expect(client.addUser).to.an.instanceOf(Function);

      const promise = client.addUser(1, 2);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/users/2`);
        expect(spy.firstCall.args[1]).to.equal(client.type);
        done();
      });
    });

    it('should list users', (done) => {
      const spy = sinon.stub(client.transport, 'get').returns(Promise.resolve());
      expect(client.listUsers).to.exist;
      expect(client.listUsers).to.an.instanceOf(Function);

      const limit = 5;
      const offset = 0;
      const promise = client.listUsers(1, limit, offset);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/users`);
        expect(spy.firstCall.args[0].params).to.have.property('limit', limit);
        expect(spy.firstCall.args[0].params).to.have.property('offset', offset);
        expect(spy.firstCall.args[1]).to.equal(client.type);
        done();
      });
    });

    it('should remove user', (done) => {
      const spy = sinon.stub(client.transport, 'delete').returns(Promise.resolve());
      expect(client.removeUser).to.exist;
      expect(client.removeUser).to.an.instanceOf(Function);

      const promise = client.removeUser(1, 2);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.have.property('url', `${client.urlBase}/1/users/2`);
        expect(spy.firstCall.args[1]).to.equal(client.type);
        done();
      });
    });
  });
});
