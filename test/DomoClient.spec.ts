import * as sinon from 'sinon';
import { expect } from 'chai';

import Transport from '../src/common/Transport';
import DatasetClient from '../src/datasets/DatasetClient';
import PDPClient from '../src/datasets/PDPClient';
import GroupClient from '../src/groups/GroupClient';
import StreamClient from '../src/streams/StreamClient';
import UserClient from '../src/users/UserClient';
import { ClientConfigException } from '../src/common/Errors';
import { API_SCOPE } from '../src/common/Constants';

import { DomoClient } from '../src';

describe('(Base): DomoClient', () => {
  it('should instantiate', (done) => {
    expect(DomoClient).to.exist;
    done();
  });

  it('should require API credentials', (done) => {
    try {
      const newClient = new DomoClient(null, null);
      expect(newClient).to.not.exist;
    } catch (err) {
      expect(err).to.exist;
      expect(err).to.be.an.instanceOf(ClientConfigException);
      done();
    }
  });

  it('should require at least one scope', (done) => {
    try {
      const newClient = new DomoClient('test', 'test', []);
      expect(newClient).to.not.exist;
    } catch (err) {
      expect(err).to.exist;
      expect(err).to.be.an.instanceOf(ClientConfigException);
      done();
    }
  });

  it('should create api clients', (done) => {
    const domo = new DomoClient('client-id', 'client-secret', [API_SCOPE.USER]);

    expect(domo.transport).to.exist;
    expect(domo.transport).to.be.an.instanceOf(Transport);

    expect(domo.datasets).to.exist;
    expect(domo.datasets).to.be.an.instanceOf(DatasetClient);

    expect(domo.policies).to.exist;
    expect(domo.policies).to.be.an.instanceOf(PDPClient);

    expect(domo.streams).to.exist;
    expect(domo.streams).to.be.an.instanceOf(StreamClient);

    expect(domo.users).to.exist;
    expect(domo.users).to.be.an.instanceOf(UserClient);

    expect(domo.groups).to.exist;
    expect(domo.groups).to.be.an.instanceOf(GroupClient);

    done();
  });
});
