import * as sinon from 'sinon';
import * as nock from 'nock';
import { expect } from 'chai';
import Transport, { Request } from '../common/Transport';
import { HTTP_METHODS } from '../common/Constants';

describe('(Base): Transport', () => {
  let client;

  beforeEach((done) => {
    client = new Transport('test', 'test');
    done();
  });

  it('should instantiate', (done) => {
    expect(Transport).to.exist;
    expect(Transport).to.be.an.instanceOf(Function);
    done();
  });
  // it('should require API credentials', (done) => {
  //   try {
  //     const newClient = new Transport();
  //     expect(newClient).to.not.exist;
  //   } catch (err) {
  //     expect(err).to.exist;
  //     expect(err.name).to.equal('TransportClientError');
  //     expect(err.message).to.equal('Missing required API credentials');
  //     done();
  //   }
  // });
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

  it('should auto-renew expired tokens', (done) => {
    // nock rejected request
    nock('https://api.domo.com')
      .get('/v1/datasets')
      .query({ limit: 1 })
      .reply(401);

    // nock access token request
    nock('https://api.domo.com')
      .get('/oauth/token')
      .query({
        scope: 'USER DATA',
        grant_type: 'client_credentials',
      })
      .reply(200, { access_token: 'test' });

    // nock successful retry
    nock('https://api.domo.com', { reqheaders: { Authorization: 'bearer test' } })
      .get('/v1/datasets')
      .query({ limit: 1 })
      .reply(200);

    const validationSpy = sinon.spy(client, 'retryRequest');
    const renewSpy = sinon.spy(client, 'renewAccessToken');
    const requestSpy = sinon.spy(client, 'request');

    client
      .get({ url: '/v1/datasets', params: { limit: 1 } })
      .then(() => {
        expect(validationSpy.calledOnce).to.be.true;
        expect(renewSpy.calledOnce).to.be.true;
        expect(requestSpy.callCount).to.be.equal(3);

        const args = <Request> requestSpy.secondCall.args[0];
        expect(args.url).to.equal('/oauth/token');
        expect(args.method).to.equal(HTTP_METHODS.GET);
        expect(args.params).to.have.property('grant_type', 'client_credentials');
        expect(args.params).to.have.property('scope', 'USER DATA');
        done();
      });
  });
});
