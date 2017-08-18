const { DomoClient } = require('../../dist');
const { API_SCOPE } = require('../../dist/common/Constants');

const clientId = process.env.DOMO_CLIENT_ID;
const clientSecret = process.env.DOMO_CLIENT_SECRET;

const scopes = [API_SCOPE.DATA];
const host = 'api.domo.com';

const domo = new DomoClient(clientId, clientSecret, scopes, host);

const limit = 5;
const offset = 0;
const sort = 'name';

domo.datasets.list(limit, offset, sort)
  .then(res => { console.log(`\nDatasetList: ${res.length}`); })
  .catch(console.error);
