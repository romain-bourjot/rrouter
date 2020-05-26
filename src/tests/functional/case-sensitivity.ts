import test from 'tape';

import { createRouter } from '@src/index';

const symbol = Symbol('expected');

test('CAT0_functional/case-sensitivity | Case-sensitivity on static route', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'GET',
      path: '/Foo/baR',
      context: symbol,
    },
    {
      method: 'GET',
      path: '/foo/bar',
      context: Symbol('no_expected'),
    },
  ];

  const router = createRouter(definitions);

  const actual = router.find('GET', '/Foo/baR');

  const expected = {
    method: 'GET',
    matchedPath: '/Foo/baR',
    path: '/Foo/baR',
    params: {},
    context: symbol,
  };

  t.deepEqual(actual, expected);
});

test('CAT0_functional/case-sensitivity | Case-sensitivity on dynamic route', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'GET',
      path: '/Foo/:id/baR',
      context: symbol,
    },
    {
      method: 'GET',
      path: '/foo/:id/bar',
      context: Symbol('no_expected'),
    },
  ];

  const router = createRouter(definitions);

  const actual = router.find('GET', '/Foo/foobar/baR');

  const expected = {
    method: 'GET',
    matchedPath: '/Foo/:id/baR',
    path: '/Foo/foobar/baR',
    params: {
      id: 'foobar',
    },
    context: symbol,
  };

  t.deepEqual(actual, expected);
});
