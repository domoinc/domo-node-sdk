const Domo = require('../src');

const clientId = process.env.DOMO_CLIENT_ID;
const clientSecret = process.env.DOMO_CLIENT_SECRET;
const host = 'api.domo.com';

const domo = new Domo(clientId, clientSecret, host);

domo.groups.list(3, 0)
	.then(res => { console.log('\nGroup List', res); })
	.catch(err => { console.error(err); });
