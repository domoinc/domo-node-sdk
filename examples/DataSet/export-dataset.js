const { DomoClient } = require('../../dist');
const { API_SCOPE } = require('../../dist/common/Constants');

const clientId = process.env.DOMO_CLIENT_ID;
const clientSecret = process.env.DOMO_CLIENT_SECRET;

const scopes = [API_SCOPE.DATA];
const host = 'api.domo.com';

const domo = new DomoClient(clientId, clientSecret, scopes, host);

// change this to the dataset you want to export
const datasetId = 'b17802e7-07f8-4be8-a500-b328408827e1';
const includeHeader = true;

domo.datasets.exportData(datasetId, includeHeader)
	.then(console.log)
	.catch(console.error);
