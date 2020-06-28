# @rmodules/rrouter

> Backend router for REST applications written in TypeScript

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/romain-bourjot/rrouter/CI/develop?style=for-the-badge)
![Coveralls github branch](https://img.shields.io/coveralls/github/romain-bourjot/rrouter/develop?style=for-the-badge)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/romain-bourjot/rrouter?style=for-the-badge)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/romain-bourjot/rrouter?style=for-the-badge)
![David](https://img.shields.io/david/romain-bourjot/rrouter?style=for-the-badge)
![David](https://img.shields.io/david/dev/romain-bourjot/rrouter?style=for-the-badge)

## Installation

### With yarn

```sh
yarn add @rmodules/rrouter
```

### With npm

```sh
npm install --save @rmodules/rrouter
```

## Usage

```typescript
import { createRouter } from '@rmodules/rrouter';

const routes = [
  {
    method: 'GET',
    path: '/',
    context: Symbol('get_slash'),
  },
  {
    method: 'POST',
    path: '/',
    context: Symbol('post_slash'),
  },
  {
    method: 'GET',
    path: '/hello',
    context: Symbol('get_hello'),
  },
];

const router = createRouter(routes);

const getSlash = router.find('GET', '/');
// {
//   method: 'GET',
//   matchedPath: '/',
//   path: '/',
//   params: {},
//   context: Symbol('get_slash'),
// }

const postSlash = router.find('POST', '/');
// {
//   method: 'POST',
//   matchedPath: '/',
//   path: '/',
//   params: {},
//   context: Symbol('post_slash'),
// }

const getHello = router.find('GET', '/hello');
// {
//   method: 'GET',
//   matchedPath: '/hello',
//   path: '/hello',
//   params: {},
//   context: Symbol('get_hello'),
// }

const getUnknown = router.find('GET', '/unknown');
// null
```

## Specification

1. This router will not accept a path that is more than 1023 characters long.
2. Only GET, PUT, PATCH, POST and DELETE methods are supported.
3. Trailing slashes are ignored (ie. /foo/bar/ ≡ /foo/bar)
4. Paths can be parametrized (ie. /foo/:id/bar will match /foo/2/bar)
5. The params object in the response MUST NOT be mutated, an error is thrown in that case
6. Routes are case-sensitive (ie. /Foo/baR ≠ /foo/bar)

## Utilities

### Prefix

Use this utility to prefix all paths of a definition set by the same string.
It can be useful to group your definitions or version them.

```typescript
import { createRouter, prefix } from '@rmodules/rrouter';

const userDefinitions = [
  {
    method: 'GET',
    path: '/',
    context: Symbol('get_user'),
  },
  {
    method: 'POST',
    path: '/',
    context: Symbol('post_user'),
  },
  {
    method: 'GET',
    path: '/:id/message',
    context: Symbol('get_message'),
  },
];

const router = createRouter(prefix('/user', userDefinitions));
router.find('GET', '/user'); // Found!
router.find('POST', '/user'); // Found!
router.find('GET', '/user/anyUserId/message'); // Found!
```
