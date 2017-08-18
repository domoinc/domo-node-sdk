const { DomoClient } = require('../../dist');
const { API_SCOPE } = require('../../dist/common/Constants');

const clientId = process.env.DOMO_CLIENT_ID;
const clientSecret = process.env.DOMO_CLIENT_SECRET;

const host = 'api.domo.com';
const scopes = [API_SCOPE.DATA];

const domo = new DomoClient(clientId, clientSecret, scopes, host);

// change this to the dataset you want to update
const datasetId = 'b17802e7-07f8-4be8-a500-b328408827e1';

const csv = `Jabba the Hutt,2017-01-01,2017-06-01,,Han Solo,Endor`;

domo.datasets.importData(datasetId, csv)
  .then(console.log)
  .catch(console.warn);
