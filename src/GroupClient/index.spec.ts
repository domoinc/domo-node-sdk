/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const expect = require('chai').expect;

const GroupClient = require('./group-client');
const TransportClient = require('../common/transport');
const HTTPMethod = require('../common/constants').HTTPMethod;

describe('(Client): Group', () => {
  let client;

  beforeEach(done => {
    const transport = new TransportClient('test', 'test');
    client = new GroupClient(transport);
    done();
  });

  it('should instantiate', done => {
    expect(GroupClient).to.exist;
    expect(client).to.be.an.instanceOf(GroupClient);
    done();
  });

  it('should require a transport', done => {
    try {
      const newClient = new GroupClient();
      expect(newClient).to.not.exist;
    } catch (err) {
      expect(err).to.exist;
      expect(err.name).to.equal('DomoAPIClientError');
      done();
    }
  });

  it('should have correct URL base', done => {
    expect(client.urlBase).to.equal('/v1/groups');
    done();
  });

  it('should create', done => {
    const spy = sinon.stub(client, '_create').returns(Promise.resolve());
    expect(client.create).to.exist;
    expect(client.create).to.an.instanceOf(Function);

    const group = {};
    const promise = client.create(group);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args).to.include(client.urlBase, group, {}, client.clientDesc);
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

    const promise = client.list(5, 0);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args).to.include(client.urlBase, client.clientDesc);
      expect(spy.firstCall.args[1]).to.have.property('limit', 5);
      expect(spy.firstCall.args[1]).to.have.property('offset', 0);
      done();
    });
  });

  it('should update', done => {
    const spy = sinon.stub(client, '_update').returns(Promise.resolve());
    expect(client.update).to.exist;
    expect(client.update).to.an.instanceOf(Function);

    const group = {};
    const promise = client.update(1, group);
    expect(promise).to.be.an.instanceOf(Promise);

    promise.then(() => {
      expect(spy.calledOnce).to.be.true;
      expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1`);
      expect(spy.firstCall.args).to.include(HTTPMethod.PUT, group, client.clientDesc);
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

  describe('Membership:', () => {
    it('should add user', done => {
      const spy = sinon.stub(client, '_update').returns(Promise.resolve());
      expect(client.addUser).to.exist;
      expect(client.addUser).to.an.instanceOf(Function);

      const promise = client.addUser(1, 2);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1/users/2`);
        expect(spy.firstCall.args).to.include(HTTPMethod.PUT, {}, client.clientDesc);
        done();
      });
    });

    it('should list users', done => {
      const spy = sinon.stub(client, '_list').returns(Promise.resolve());
      expect(client.listUsers).to.exist;
      expect(client.listUsers).to.an.instanceOf(Function);

      const promise = client.listUsers(1, 5, 0);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1/users`);
        expect(spy.firstCall.args).to.include(client.clientDesc);
        expect(spy.firstCall.args[1]).to.have.property('limit', 5);
        expect(spy.firstCall.args[1]).to.have.property('offset', 0);
        done();
      });
    });

    it('should remove user', done => {
      const spy = sinon.stub(client, '_delete').returns(Promise.resolve());
      expect(client.removeUser).to.exist;
      expect(client.removeUser).to.an.instanceOf(Function);

      const promise = client.removeUser(1, 2);
      expect(promise).to.be.an.instanceOf(Promise);

      promise.then(() => {
        expect(spy.calledOnce).to.be.true;
        expect(spy.firstCall.args[0]).to.equal(`${client.urlBase}/1/users/2`);
        expect(spy.firstCall.args[1]).to.equal(client.clientDesc);
        done();
      });
    });
  });
});
