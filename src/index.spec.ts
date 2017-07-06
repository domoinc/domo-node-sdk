import { expect } from 'chai';
import DomoSDK from './';
import TransportClient from './common/TransportClient';
import DatasetClient from './DatasetClient';
import GroupClient from './GroupClient';
import StreamClient from './StreamClient';
import UserClient from './UserClient';

describe('(Base): DomoSDK', () => {
  it('should instantiate', done => {
    expect(DomoSDK).to.exist;
    done();
  });

  it('should create api clients', done => {
    const domo = new DomoSDK('client-id', 'client-secret', 'test.domo.com');

    expect(domo.transport).to.exist;
    expect(domo.transport).to.be.an.instanceOf(TransportClient);

    expect(domo.datasets).to.exist;
    expect(domo.datasets).to.be.an.instanceOf(DatasetClient);

    expect(domo.streams).to.exist;
    expect(domo.streams).to.be.an.instanceOf(StreamClient);

    expect(domo.users).to.exist;
    expect(domo.users).to.be.an.instanceOf(UserClient);

    expect(domo.groups).to.exist;
    expect(domo.groups).to.be.an.instanceOf(GroupClient);

    done();
  });
});
