import TransportClient from '../transport';
import { HTTPMethod } from '../constants';
import { DomoAPIClientError } from '../errors';

class DomoAPIClient {
  constructor(transport) {
    if (!transport || !(transport instanceof TransportClient)) {
      throw new DomoAPIClientError('TransportClient is required');
    }

    this.transport = transport;
  }

  _create(url, body, params, objDesc) {
    return this.transport.validateAccessToken()
      .then(() => this.transport.post({ url, body, params }))
      .catch(err => {
        throw new DomoAPIClientError(`Error creating ${objDesc}`, err, objDesc);
      });
  }

  _get(url, params, headers, objDesc) {
    return this.transport.validateAccessToken()
      .then(() => this.transport.get({ url, params, headers }))
      .catch(err => {
        throw new DomoAPIClientError(`Error retrieving ${objDesc}`, err, objDesc);
      });
  }

  _list(url, params, objDesc) {
    return this.transport.validateAccessToken()
      .then(() => this.transport.get({ url, params }))
      .catch(err => {
        throw new DomoAPIClientError(`Error retrieving list of ${objDesc}`, err, objDesc);
      });
  }

  _update(url, method, headers, body, isJson, objDesc) {
    return this.transport.validateAccessToken()
      .then(() => {
        let response;

        if (method === HTTPMethod.PUT) {
          response = this.transport.put({ url, headers, body }, isJson);
        } else if (method === HTTPMethod.PATCH) {
          response = this.transport.patch({ url, headers, body }, isJson);
        }

        return response;
      })
      .catch(err => {
        throw new DomoAPIClientError(`Error updating ${objDesc}`, err, objDesc);
      });
  }

  _delete(url, objDesc) {
    return this.transport.validateAccessToken()
      .then(() => this.transport.delete({ url }))
      .catch(err => {
        throw new DomoAPIClientError(`Error deleting ${objDesc}`, err, objDesc);
      });
  }
}

module.exports = DomoAPIClient;
