import test from 'tape';

import { createRouter } from '../../src/index';

const getSlashSymbol = Symbol('get_slash');

test('CAT1_functional/max-path-length | GET /(1024 characters)', (t) => {
  t.plan(1);

  const path = '/' + new Array(1023).fill('a').join('');

  const definitions = [
    {
      method: 'GET',
      path: '/:id',
      context: getSlashSymbol,
    },
  ];

  const router = createRouter(definitions);

  const actual = router.find('GET', path);

  const expected = null;

  t.deepEqual(actual, expected);
});

test('CAT1_functional/max-path-length | On creation /(1024 characters)', (t) => {
  t.plan(1);

  const path = '/' + new Array(1023).fill('a').join('');

  const definitions = [
    {
      method: 'GET',
      path,
      context: getSlashSymbol,
    },
  ];

  const wrapped = () => createRouter(definitions);

  t.throws(wrapped);
});

test('CAT0_functional/max-path-length | GET /(1023 characters)', (t) => {
  t.plan(1);

  const path = '/' + new Array(1022).fill('a').join('');

  const definitions = [
    {
      method: 'GET',
      path,
      context: getSlashSymbol,
    },
  ];

  const router = createRouter(definitions);

  const actual = router.find('GET', path);

  const expected = {
    method: 'GET',
    matchedPath: path,
    path,
    params: {},
    context: getSlashSymbol,
  };

  t.deepEqual(actual, expected);
});
