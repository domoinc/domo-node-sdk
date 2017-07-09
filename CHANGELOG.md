# Domo API SDK: NodeJS Changelog

## 1.0.0

* Initial Release

## 1.0.1

* NPM setup documentation

## 2.0.0

* Rewrite in TypeScript
* Require a Scope array as part of the DomoClient instantiation
* Replace pre-request validation with a post-request 401 check. If 401 then access token is refreshed and the original request is repeated
