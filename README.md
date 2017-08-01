<div align="center">
  <img src="https://github.com/domoinc/domo-node-sdk/blob/master/domo.png?raw=true" width="400" height="400"/>
</div>

# NodeJS - Domo API SDK
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](http://www.opensource.org/licenses/MIT)

### About

* The Domo API SDK is the simplest way to automate your Domo instance
* The SDK streamlines the API programming experience, allowing you to significantly reduce your written code

### Features:
- DataSet and Personalized Data Policy (PDP) Management
    - Use DataSets for fairly static data sources that only require occasional updates via data replacement
    - Add Personalized Data Policies (PDPs) to DataSets (hide sensitive data from groups of users)
    - Docs: https://developer.domo.com/docs/domo-apis/data
- Stream Management
    - A Domo Stream is a specialized upload pipeline pointing to a single Domo DataSet
    - Use Streams for massive, constantly changing, or rapidly growing data sources
    - Streams support accelerated uploading via parallel data uploads
    - Docs: https://developer.domo.com/docs/domo-apis/stream-apis
- User Management
    - Create, update, and remove users
    - Major use case: LDAP/Active Directory synchronization
    - Docs: https://developer.domo.com/docs/domo-apis/users
- Group Management
    - Create, update, and remove groups of users
    - Docs: https://developer.domo.com/docs/domo-apis/group-apis

### Setup
* Install NodeJS/npm: https://nodejs.org/en/download/
    * Linux: `apt-get install nodejs`
    * MacOS: `brew install nodejs`
    * Windows: direct download, or use Bash on Windows 10
* Install module
    
        $ npm install --save domo-sdk

### Updates
* View the [changelog](CHANGELOG.md)

### Usage
* For basic usage see [/examples](/examples)
* For full TypeScript usage refer to [/test](/test).
* Create an API Client on the [Domo Developer Portal](https://developer.domo.com/)
* Use your API Client id/secret to instantiate an SDK instance
* Multiple API Clients can be used by instantiating multiple SDK clients
* Authentication with the Domo API is handled automatically by the SDK
* If you encounter a 'Not Allowed' error, this is a permissions issue. Please speak with your Domo Administrator.
