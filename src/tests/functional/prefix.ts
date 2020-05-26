import test from 'tape';

import { createRouter, prefix } from '@src/index';

const getUserSymbol = Symbol('get_user');
const postUserSymbol = Symbol('post_user');
const getUserMessageSymbol = Symbol('get_user_message');

const getDefinitions = () => [
  {
    method: 'GET',
    path: '/',
    context: getUserSymbol,
  },
  {
    method: 'POST',
    path: '/',
    context: postUserSymbol,
  },
  {
    method: 'GET',
    path: '/:id/message',
    context: getUserMessageSymbol,
  },
];

test('CAT0_functional/prefix | GET user', (t) => {
  t.plan(1);

  const router = createRouter(prefix('/user', getDefinitions()));

  const actual = router.find('GET', '/user');

  const expected = {
    method: 'GET',
    matchedPath: '/user',
    path: '/user',
    params: {},
    context: getUserSymbol,
  };

  t.deepEqual(actual, expected);
});

test('CAT0_functional/prefix | POST user', (t) => {
  t.plan(1);

  const router = createRouter(prefix('/user', getDefinitions()));

  const actual = router.find('POST', '/user');

  const expected = {
    method: 'POST',
    matchedPath: '/user',
    path: '/user',
    params: {},
    context: postUserSymbol,
  };

  t.deepEqual(actual, expected);
});

test('CAT0_functional/prefix | GET user message', (t) => {
  t.plan(1);

  const router = createRouter(prefix('/user', getDefinitions()));

  const actual = router.find('GET', '/user/anyUserId/message');

  const expected = {
    method: 'GET',
    matchedPath: '/user/:id/message',
    path: '/user/anyUserId/message',
    params: {
      id: 'anyUserId',
    },
    context: getUserMessageSymbol,
  };

  t.deepEqual(actual, expected);
});

test('CAT1_functional/prefix | GET unprefixed', (t) => {
  t.plan(1);

  const router = createRouter(prefix('/user', getDefinitions()));

  const actual = router.find('GET', '/');

  const expected = null;

  t.deepEqual(actual, expected);
});

test('CAT1_functional/prefix | GET dynamic unprefixed', (t) => {
  t.plan(1);

  const router = createRouter(prefix('/user', getDefinitions()));

  const actual = router.find('GET', '/anyUserId/message');

  const expected = null;

  t.deepEqual(actual, expected);
});