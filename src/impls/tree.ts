import { Definition, Router, Result } from '../types';

type Leaf<Context> = {
  name: string,
  path: string,
  context: Context | null,
  children: { [key: string]: Leaf<Context> },
  params: [string, number][],
};

type Tree<Context> = Leaf<Context>;

function createEmptyLeaf<Context>(name: string): Tree<Context> {
  return {
    name,
    path: '',
    context: null,
    children: {},
    params: [],
  };
}

function createEmptyTree<Context>(): Tree<Context> {
  const root = createEmptyLeaf<Context>('root');

  root.children.GET = createEmptyLeaf('GET');
  root.children.POST = createEmptyLeaf('POST');
  root.children.PUT = createEmptyLeaf('PUT');
  root.children.PATCH = createEmptyLeaf('PATCH');
  root.children.DELETE = createEmptyLeaf('DELETE');

  return root;
}

function createParams(split: string[], def: [string, number][]): Readonly<{ [key: string]: string }> {
  const params: { [key: string]: string } = {};

  for (let i = 0; i < def.length; i++) {
    params[def[i][0]] = split[def[i][1]];
  }

  return Object.freeze(params);
}

function traverse<Context>(
  tree: Tree<Context>,
  method: string,
  split: string[],
): Leaf<Context> | null {
  let leaf = tree.children[method];

  for (let i = 1; i < split.length && leaf; i++) {
    leaf = leaf.children[split[i]] || leaf.children['*'];
  }

  return leaf;
}

function indexTree<Context>(definitions: Definition<Context>[]): Tree<Context> {
  const tree = createEmptyTree<Context>();

  for (let j = 0; j < definitions.length; j++) {
    const definition = definitions[j];

    const pathParams = [];
    const split = (definition.method + definition.path).split('/');

    let leaf = tree;
    for (let i = 0; i < split.length; i++) {
      let partial = split[i];

      if (partial[0] === ':') {
        const paramName = partial.substring(1);
        pathParams.push([paramName, i]);
        partial = '*';
      }

      if (!leaf.children[partial]) {
         leaf.children[partial] = createEmptyLeaf(partial);
      }

      leaf = leaf.children[partial];
    }

    leaf.context = definition.context;
    leaf.path = definition.path;
    leaf.params = pathParams;
  }

  return tree;
}

export function createRouter<Context>(definitions: Definition<Context>[]): Router<Context> {
  const tree = indexTree<Context>(definitions);

  return {
    find: (method: string, path: string): Result<Context> | null => {
      const split = path.split('/');

      const found = traverse(tree, method, split);

      if (!found || !found.context) {
        return null;
      }

      return {
        method,
        path,
        matchedPath: found.path,
        params: createParams(split, found.params),
        context: found.context,
      };
    },
  };
}
