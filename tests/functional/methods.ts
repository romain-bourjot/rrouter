import test from 'tape';

import { createRouter } from '../../src/index';

test('CAT0_functional/methods | GET on create', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'GET',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const wrapped = () => createRouter(definitions);

  t.doesNotThrow(wrapped);
});

test('CAT0_functional/methods | GET on request', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'GET',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const router = createRouter(definitions);

  const result = router.find('GET', '/hello');

  t.notEqual(result, null);
});

test('CAT0_functional/methods | PUT on create', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'PUT',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const wrapped = () => createRouter(definitions);

  t.doesNotThrow(wrapped);
});

test('CAT0_functional/methods | GET on request', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'PUT',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const router = createRouter(definitions);

  const result = router.find('PUT', '/hello');

  t.notEqual(result, null);
});

test('CAT0_functional/methods | PATCH on create', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'PATCH',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const wrapped = () => createRouter(definitions);

  t.doesNotThrow(wrapped);
});

test('CAT0_functional/methods | PATCH on request', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'PATCH',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const router = createRouter(definitions);

  const result = router.find('PATCH', '/hello');

  t.notEqual(result, null);
});

test('CAT0_functional/methods | POST on create', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'POST',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const wrapped = () => createRouter(definitions);

  t.doesNotThrow(wrapped);
});

test('CAT0_functional/methods | POST on request', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'POST',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const router = createRouter(definitions);

  const result = router.find('POST', '/hello');

  t.notEqual(result, null);
});

test('CAT0_functional/methods | DELETE on create', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'DELETE',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const wrapped = () => createRouter(definitions);

  t.doesNotThrow(wrapped);
});

test('CAT0_functional/methods | DELETE on request', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'DELETE',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const router = createRouter(definitions);

  const result = router.find('DELETE', '/hello');

  t.notEqual(result, null);
});

test('CAT1_functional/methods | OPTIONS on create', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'OPTIONS',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const wrapped = () => createRouter(definitions);

  t.throws(wrapped);
});

test('CAT1_functional/methods | OPTIONS on request', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'GET',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const router = createRouter(definitions);

  const result = router.find('OPTIONS', '/hello');

  t.equal(result, null);
});


test('CAT1_functional/methods | HEAD on create', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'HEAD',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const wrapped = () => createRouter(definitions);

  t.throws(wrapped);
});

test('CAT1_functional/methods | HEAD on request', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'GET',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const router = createRouter(definitions);

  const result = router.find('HEAD', '/hello');

  t.equal(result, null);
});

test('CAT1_functional/methods | UNKNOWN on create', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'UNKNOWN',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const wrapped = () => createRouter(definitions);

  t.throws(wrapped);
});

test('CAT1_functional/methods | UNKNOWN on request', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'GET',
      path: '/hello',
      context: Symbol(),
    },
  ];

  const router = createRouter(definitions);

  const result = router.find('UNKNOWN', '/hello');

  t.equal(result, null);
});
