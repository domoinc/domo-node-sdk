const { DomoClient } = require('../dist');
const { API_SCOPE } = require('../dist/common/Constants');
const clientId = process.env.DOMO_CLIENT_ID;
const clientSecret = process.env.DOMO_CLIENT_SECRET;
const host = 'api.domo.com';
const scopes = [API_SCOPE.USER];

const domo = new DomoClient(clientId, clientSecret, scopes, host);

domo.groups.list(3, 0)
	.then(res => { console.log('\nGroup List', res); })
	.catch(console.error);
