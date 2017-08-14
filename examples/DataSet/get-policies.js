const { DomoClient } = require('../dist');
const { API_SCOPE } = require('../dist/common/Constants');

const clientId = process.env.DOMO_CLIENT_ID;
const clientSecret = process.env.DOMO_CLIENT_SECRET;

const datasetId = 'e10348d6-b0ab-4471-9195-4f862ac3c56c';
const scopes = [API_SCOPE.DATA];
const host = 'api.domo.com';

const domo = new DomoClient(clientId, clientSecret, scopes, host);

domo.policies.list(datasetId)
  .then(res => { console.log(`\nPolicies: ${res.length}`); })
  .catch(console.error);
