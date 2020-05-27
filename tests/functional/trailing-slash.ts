import test from 'tape';

import { createRouter } from '../../src/index';

test('CAT0_functional/trailing-slash | Trailing slash in request', (t) => {
  t.plan(1);

  const symbol = Symbol('expected');
  const definitions = [
    {
      method: 'GET',
      path: '/foo/bar',
      context: symbol,
    },
  ];
  const router = createRouter(definitions);

  const actual = router.find('GET', '/foo/bar/');

  const expected = {
    method: 'GET',
    matchedPath: '/foo/bar',
    path: '/foo/bar',
    params: {},
    context: symbol,
  };

  t.deepEqual(actual, expected);
});

test('CAT0_functional/trailing-slash | Trailing slash in definition', (t) => {
  t.plan(1);

  const symbol = Symbol('expected');
  const definitions = [
    {
      method: 'GET',
      path: '/foo/bar/',
      context: symbol,
    },
  ];
  const router = createRouter(definitions);

  const actual = router.find('GET', '/foo/bar');

  const expected = {
    method: 'GET',
    matchedPath: '/foo/bar',
    path: '/foo/bar',
    params: {},
    context: symbol,
  };

  t.deepEqual(actual, expected);
});

test('CAT0_functional/trailing-slash | Root', (t) => {
  t.plan(1);

  const symbol = Symbol('expected');
  const definitions = [
    {
      method: 'GET',
      path: '/',
      context: symbol,
    },
  ];
  const router = createRouter(definitions);

  const actual = router.find('GET', '/');

  const expected = {
    method: 'GET',
    matchedPath: '/',
    path: '/',
    params: {},
    context: symbol,
  };

  t.deepEqual(actual, expected);
});