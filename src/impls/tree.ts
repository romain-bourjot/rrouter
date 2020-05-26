import { Definition, Router, Result } from '../types';

type Leaf<Context> = {
  name: string,
  path: string,
  context: Context | null,
  children: { [key: string]: number },
  params: { [name: string]: number },
};

type Tree<Context> = Leaf<Context>[];

const emptyTree = <Context>(): Tree<Context> => [
  {
    name: 'root',
    path: '',
    context: null,
    children: {
      GET: 1,
      POST: 2,
      PUT: 3,
      PATCH: 4,
      DELETE: 5,
    },
    params: {},
  },
  { name: 'GET', context: null, children: {}, path: '', params: {} },
  { name: 'POST', context: null, children: {}, path: '', params: {} },
  { name: 'PUT', context: null, children: {}, path: '', params: {} },
  { name: 'PATCH', context: null, children: {}, path: '', params: {} },
  { name: 'DELETE', context: null, children: {}, path: '', params: {} },
];

export function createRouter<Context>(definitions: Definition<Context>[]): Router<Context> {
  const tree = emptyTree<Context>();

  for (let j = 0; j <  definitions.length; j++) {
    const definition = definitions[j];

    const pathParams = {};
    const split = (definition.method + definition.path).split('/');

    for (let i = 0; i < split.length; i++) {
      const partial = split[i];
      if (partial[0] === ':') {
        const paramName = partial.substring(1);
        pathParams[paramName] = i;
        split[i] = '*';
      }
    }

    let leaf = tree[0];
    for (let i = 0; i < split.length; i++) {
      const partial = split[i];

      if (!leaf.children[partial]) {
        leaf.children[partial] = tree.length;
        tree.push({
          path: '',
          name: partial,
          context: null,
          children: {},
          params: {},
        });
      }

      leaf = tree[leaf.children[partial]];
    }

    leaf.context = definition.context;
    leaf.path = definition.path;
    leaf.params = pathParams;
  }

  return {
    find: (method: string, path: string): Result<Context> | null => {
      const split = (method + path).split('/');

      let leaf = tree[0];

      for (let i = 0; i < split.length; i++) {
        const partial = split[i];

        const nextIndex = leaf.children[partial] || leaf.children['*'];
        if (!nextIndex) {
          return null;
        }

        leaf = tree[nextIndex];
      }

      if (!leaf.context) {
        return null;
      }

      const params = {};
      const paramDefinition = Object.entries(leaf.params);

      for (let i = 0; i < paramDefinition.length; i++) {
        const [name, index] = paramDefinition[i];
        params[name] = split[index];
      }

      return {
        method,
        path,
        matchedPath: leaf.path,
        params,
        context: leaf.context,
      };
    },
  };
}
