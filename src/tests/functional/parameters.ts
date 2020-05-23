import test from 'tape';

import { createRouter } from '@src/index';

const symbol = Symbol('expected');

test('CAT0_functional/parameters | GET /foo/:foo-id/bar/:bar-id', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'GET',
      path: '/foo/:foo-id/bar/:bar-id',
      context: symbol,
    },
  ];

  const router = createRouter(definitions);

  const actual = router.find('GET', '/foo/expectedFooId/bar/expectedBarId');

  const expected = {
    method: 'GET',
    matchedPath: '/foo/:foo-id/bar/:bar-id',
    path: '/foo/expectedFooId/bar/expectedBarId',
    params: new Map([
      ['foo-id', 'expectedFooId'],
      ['bar-id', 'expectedBarId'],
    ]),
    context: symbol,
  };

  t.deepEqual(actual, expected);
});
