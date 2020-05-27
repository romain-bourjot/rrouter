import test from 'tape';

import { createRouter } from '../../src/index';

const getSlashSymbol = Symbol('get_slash');
const postSlashSymbol = Symbol('post_slash');
const getHelloSymbol = Symbol('get_hello');

const getDefinitions = () => [
  {
    method: 'GET',
    path: '/',
    context: getSlashSymbol,
  },
  {
    method: 'POST',
    path: '/',
    context: postSlashSymbol,
  },
  {
    method: 'GET',
    path: '/hello',
    context: getHelloSymbol,
  },
];

test('CAT0_functional/simple-usage | GET slash', (t) => {
  t.plan(1);

  const router = createRouter(getDefinitions());

  const actual = router.find('GET', '/');

  const expected = {
    method: 'GET',
    matchedPath: '/',
    path: '/',
    params: {},
    context: getSlashSymbol,
  };

  t.deepEqual(actual, expected);
});

test('CAT0_functional/simple-usage | POST slash', (t) => {
  t.plan(1);

  const router = createRouter(getDefinitions());

  const actual = router.find('POST', '/');

  const expected = {
    method: 'POST',
    matchedPath: '/',
    path: '/',
    params: {},
    context: postSlashSymbol,
  };

  t.deepEqual(actual, expected);
});

test('CAT0_functional/simple-usage | GET hello', (t) => {
  t.plan(1);

  const router = createRouter(getDefinitions());

  const actual = router.find('GET', '/hello');

  const expected = {
    method: 'GET',
    matchedPath: '/hello',
    path: '/hello',
    params: {},
    context: getHelloSymbol,
  };

  t.deepEqual(actual, expected);
});

test('CAT1_functional/simple-usage | GET unknown', (t) => {
  t.plan(1);

  const router = createRouter(getDefinitions());

  const actual = router.find('GET', '/unknown');

  const expected = null;

  t.deepEqual(actual, expected);
});
