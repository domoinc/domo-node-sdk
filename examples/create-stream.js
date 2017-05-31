const Domo = require('../src');

const clientId = process.env.DOMO_CLIENT_ID;
const clientSecret = process.env.DOMO_CLIENT_SECRET;
const host = 'api.domo.com';

const domo = new Domo(clientId, clientSecret, host);

const dataset = {
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
};

domo.streams.create(dataset, 'APPEND')
  .then(res => {
    console.log('\nNew Stream: ', res.id, res.dataSet.id);

    return domo.streams.createExecution(res.id).then(rs => {
      return { streamId: res.id, execId: rs.id };
    });
  })
  .then(res => {
    console.log('\nExecution Ready:', res);

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
  .then(res => {
    console.log('\nDataset Ready: ', res);
  });
