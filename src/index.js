import TransportClient from './common/transport';
import DatasetClient from './datasets';
import StreamClient from './streams';
import UserClient from './users';
import GroupClient from './groups';

class Domo {
  constructor(clientId, clientSecret, host) {
    this.transport = new TransportClient(clientId, clientSecret, host);
    this.datasets = new DatasetClient(this.transport);
    this.streams = new StreamClient(this.transport);
    this.users = new UserClient(this.transport);
    this.groups = new GroupClient(this.transport);
  }
}

module.exports = Domo;
