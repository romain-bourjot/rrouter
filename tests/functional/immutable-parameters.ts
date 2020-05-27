import test from 'tape';

import { createRouter } from '../../src/index';

const symbol = Symbol('expected');

test('CAT0_functional/immutable-parameters | Mutate parameters on static route', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'GET',
      path: '/foo/bar',
      context: symbol,
    },
  ];

  const router = createRouter(definitions);

  const result = router.find('GET', '/foo/bar');

  // @ts-ignore
  const wrapped = () => result.params.lol = 'yolo';

  t.throws(wrapped, /object is not extensible/);
});

test('CAT0_functional/immutable-parameters | Mutate parameters on dynamic route', (t) => {
  t.plan(1);

  const definitions = [
    {
      method: 'GET',
      path: '/foo/:foo-id/bar/:bar-id',
      context: symbol,
    },
  ];

  const router = createRouter(definitions);

  const result = router.find('GET', '/foo/expectedFooId/bar/expectedBarId');

  // @ts-ignore
  const wrapped = () => result.params.lol = 'yolo';

  t.throws(wrapped, /object is not extensible/);
});
