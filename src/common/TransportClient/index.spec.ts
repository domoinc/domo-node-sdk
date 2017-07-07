import sinon from 'sinon';
import nock from 'nock';
import { expect } from 'chai';

/* tslint:disable-next-line:import-name */
import TransportClient from '.';

describe('(Base): TransportClient', () => {
  let client;

  beforeEach((done) => {
    client = new TransportClient('test', 'test');
    done();
  });

  it('should instantiate', (done) => {
    expect(TransportClient).to.exist;
    expect(TransportClient).to.be.an.instanceOf(Function);
    done();
  });

  it('should require API credentials', (done) => {
    try {
      const newClient = new TransportClient();
      expect(newClient).to.not.exist;
    } catch (err) {
      expect(err).to.exist;
      expect(err.name).to.equal('TransportClientError');
      expect(err.message).to.equal('Missing required API credentials');
      done();
    }
  });

  it('should have REST methods', (done) => {
    const expectedFunctions = ['get', 'post', 'put', 'patch', 'delete'];

    expectedFunctions.forEach((fn) => {
      expect(client[fn]).to.exist;
      expect(client[fn]).to.be.an.instanceOf(Function);
    });

    done();
  });

  it('REST methods should call single request', (done) => {
    const spy = sinon.stub(client, 'request').returns(Promise.resolve());
    const expectedFunctions = ['get', 'post', 'put', 'patch', 'delete'];
    const promises = expectedFunctions.map(fn => client[fn]({}));

    Promise.all(promises).then(() => {
      expect(spy.callCount).to.be.equal(expectedFunctions.length);
      spy.restore();
      done();
    });
  });

  it('should check for expired tokens', (done) => {
    nock('https://api.domo.com').get('/v1/users').reply(200, { statusCode: 200 });
    const spy = sinon.spy(client, '_tokenExpired');
    client.validateAccessToken().then(() => {
      expect(spy.calledOnce).to.be.true;
      done();
    });
  });

  it('should auto-renew expired tokens', (done) => {
    nock('https://api.domo.com')
      .get('/v1/users')
      .reply(400);

    nock('https://api.domo.com')
      .get('/oauth/token?grant_type=client_credentials&scope=data%20user')
      .reply(200, { access_token: 'test' });

    const tokenSpy = sinon.spy(client, '_tokenExpired');
    const renewSpy = sinon.spy(client, '_renewAccessToken');
    const requestSpy = sinon.spy(client, 'request');

    client.validateAccessToken().then(() => {
      expect(tokenSpy.calledOnce).to.be.true;
      expect(renewSpy.calledOnce).to.be.true;
      expect(requestSpy.callCount).to.be.equal(2);

      const args = requestSpy.lastCall.args;

      expect(args).to.include('/oauth/token', 'GET');
      expect(args[2]).to.have.property('Authorization');
      expect(args[3]).to.have.property('grant_type', 'client_credentials');
      expect(args[3]).to.have.property('scope', 'data user');
      done();
    });
  });
});
