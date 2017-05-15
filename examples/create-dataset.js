'use strict';

const Domo = require('../dist');

const clientId = process.env.DOMO_CLIENT_ID;
const clientSecret = process.env.DOMO_CLIENT_SECRET;
const host = 'api.domo.com';
let datasetId;

const domo = new Domo(clientId, clientSecret, host);

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
    datasetId = res.id;

    console.log('\nDataset Created', datasetId);

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
  .then(res => { console.log('\nDataset Exported:\n', res); })
  .catch(err => { console.error(err); });
