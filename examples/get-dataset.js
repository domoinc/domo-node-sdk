const Domo = require('../src');

const clientId = process.env.DOMO_CLIENT_ID;
const clientSecret = process.env.DOMO_CLIENT_SECRET;
const datasetId = 'e10348d6-b0ab-4471-9195-4f862ac3c56c';
const host = 'api.domo.com';

const domo = new Domo(clientId, clientSecret, host);

domo.datasets.list('name', 5, 0)
  .then(res => { console.log('\nDatasetList', res.length); })
  .catch(err => { console.error(err); });

domo.datasets.get(datasetId)
	.then(res => { console.log('\nDataset', res); })
	.catch(err => { console.error(err); });
