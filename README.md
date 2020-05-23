# @rmodules/rrouter

> Backend router for REST applications written in TypeScript

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
//   params: Map {},
//   context: Symbol('get_slash'),
// }

const postSlash = router.find('POST', '/');
// {
//   method: 'POST',
//   matchedPath: '/',
//   path: '/',
//   params: Map {},
//   context: Symbol('post_slash'),
// }

const getHello = router.find('GET', '/hello');
// {
//   method: 'GET',
//   matchedPath: '/hello',
//   path: '/hello',
//   params: Map {},
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
