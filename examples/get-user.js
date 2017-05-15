'use strict';

const Domo = require('../dist');

const clientId = process.env.DOMO_CLIENT_ID;
const clientSecret = process.env.DOMO_CLIENT_SECRET;
const userId = '715147833';
const host = 'api.domo.com';

const domo = new Domo(clientId, clientSecret, host);

domo.users.get(userId)
  .then(res => { console.log('\nUser', res); })
  .catch(err => { console.error(err); });

domo.users.list(3, 0)
	.then(res => { console.log('\nUser List', res); })
	.catch(err => { console.error(err); });
