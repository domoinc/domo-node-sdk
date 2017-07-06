import TransportClient from './common/TransportClient';
import DatasetClient from './DatasetClient';
import StreamClient from './StreamClient';
import UserClient from './UserClient';
import GroupClient from './GroupClient';

class Domo {
  transport: TransportClient;
  datasets: DatasetClient;
  streams: StreamClient;
  users: UserClient;
  groups: GroupClient;

  constructor(clientId: string, clientSecret: string, host: string) {
    this.transport = new TransportClient(clientId, clientSecret, host);
    this.datasets = new DatasetClient(this.transport);
    this.streams = new StreamClient(this.transport);
    this.users = new UserClient(this.transport);
    this.groups = new GroupClient(this.transport);
  }
}

export default Domo;
