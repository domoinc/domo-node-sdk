const TransportClient = require('./common/transport');
const DatasetClient = require('./datasets');
const StreamClient = require('./streams');
const UserClient = require('./users');
const GroupClient = require('./groups');

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
