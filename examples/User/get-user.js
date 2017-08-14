const { DomoClient } = require('../dist');
const { API_SCOPE } = require('../dist/common/Constants');

const clientId = process.env.DOMO_CLIENT_ID;
const clientSecret = process.env.DOMO_CLIENT_SECRET;
const userId = '715147833';
const host = 'api.domo.com';
const scopes = [API_SCOPE.USER];

const domo = new DomoClient(clientId, clientSecret, scopes, host);

domo.users.get(userId)
  .then(res => { console.log('\nUser', res.email); })
  .catch(console.error);

domo.users.list(3, 0)
	.then(res => { console.log('\nUser List', res.length); })
	.catch(console.error);