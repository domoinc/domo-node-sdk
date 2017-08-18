const { DomoClient } = require('../../dist');
const { API_SCOPE } = require('../../dist/common/Constants');

let datasetId;
const clientId = process.env.DOMO_CLIENT_ID;
const clientSecret = process.env.DOMO_CLIENT_SECRET;
const host = 'api.domo.com';
const scopes = [API_SCOPE.DATA];

const domo = new DomoClient(clientId, clientSecret, scopes, host);

const dataset = {
  name: 'Boba Fett Contracts',
  description: 'Keep track of those bounties',
  rows: 0,
  schema: {
    columns: [
      { type: 'STRING', name: 'Client' },
      { type: 'DATE', name: 'Contract Start' },
      { type: 'DATE', name: 'Contract Due' },
      { type: 'DATE', name: 'Contract Complete' },
      { type: 'STRING', name: 'Bounty Name' },
      { type: 'STRING', name: 'Last Known Location' }
    ]
  }
};

domo.datasets.create(dataset)
  .then(res => {
    console.log('\nDataset Created', res.id);
    datasetId = res.id;

    const data = [
      ['Jabba the Hutt', '2017-01-01', '2017-06-01', '', 'Han Solo', 'Endor'],
      ['Darth Vader', '2017-01-01', '2017-06-01', '', 'Luke Skywalker', 'Tatooine']
    ];

    const csv = data
      .map(row => row.join(','))
      .join('\n');

    return domo.datasets.importData(datasetId, csv);
  })
  .then(res => {
    console.log('\nData Imported: ', datasetId);

    return domo.datasets.exportData(datasetId, true);
  })
  .then(console.log)
  .catch(console.warn);
