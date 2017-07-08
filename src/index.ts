import * as DEBUG from 'debug';

import Transport from './common/Transport';
import DatasetClient from './datasets/DatasetClient';
import StreamClient from './streams/StreamClient';
import UserClient from './users/UserClient';
import GroupClient from './groups/GroupClient';
import { API_SCOPE } from './common/Constants';
import { ClientConfigException } from './common/Errors';

const debug = DEBUG('domo-sdk');

export default class DomoClient {
  transport: Transport;
  datasets: DatasetClient;
  streams: StreamClient;
  users: UserClient;
  groups: GroupClient;

  constructor(
    clientId: string,
    clientSecret: string,
    scope = [API_SCOPE.USER, API_SCOPE.DATA],
    host = 'api.domo.com',
  ) {
    if (!clientId || !clientSecret) {
      const err = new ClientConfigException('clientId, clientSecret');
      debug(err.message);
      throw err;
    }

    if (scope && scope.length === 0) {
      const err = new ClientConfigException('scope');
      debug(err.message);
      throw err;
    }

    this.transport = new Transport(clientId, clientSecret, scope, host);
    this.datasets = new DatasetClient(this.transport);
    this.streams = new StreamClient(this.transport);
    this.users = new UserClient(this.transport);
    this.groups = new GroupClient(this.transport);
  }
}
