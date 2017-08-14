const { DomoClient } = require('../dist');
const { API_SCOPE, UPDATE_METHODS } = require('../dist/common/Constants');

const clientId = process.env.DOMO_CLIENT_ID;
const clientSecret = process.env.DOMO_CLIENT_SECRET;
const host = 'api.domo.com';
const scopes = [API_SCOPE.DATA];

const domo = new DomoClient(clientId, clientSecret, scopes, host);

const stream = {
  dataSet: {
    name: 'Leonhard Euler Party',
    description: 'Mathematician Guest List',
    schema: {
      columns: [{
        type: 'STRING',
        name: 'Friend'
      }, {
        type: 'STRING',
        name: 'Attending'
      }]
    }
  },
  updateMethod: UPDATE_METHODS[UPDATE_METHODS.APPEND]
};

domo.streams.create(stream)
  .then(res => {
    console.log('\nNew Stream: ', res.id, res.dataSet.id);

    return domo.streams.createExecution(res.id).then(rs => {
      return { streamId: res.id, execId: rs.id };
    });
  })
  .then(res => {
    const data = [
      ['Pythagoras', 'FALSE'],
      ['Alan Turing', 'TRUE'],
      ['George Boole', 'TRUE']
    ];

    const csv = data
      .map(row => row.join(','))
      .join('\n');

    return domo.streams.uploadPart(res.streamId, res.execId, 1, csv)
      .then(() => domo.streams.commit(res.streamId, res.execId));
  })
  .then(console.log)
  .catch(console.warn);
