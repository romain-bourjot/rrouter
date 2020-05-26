import { Definition, Router, Result } from '../types';

type Index<Context> = { [key: string]: Definition<Context> };
type RootIndex<Context> = {
  GET: Index<Context>,
  PUT: Index<Context>,
  POST: Index<Context>,
  PATCH: Index<Context>,
  DELETE: Index<Context>,
};

export function createRouter<Context>(definitions: Definition<Context>[]): Router<Context> {
  const indexedMap: RootIndex<Context> = {
    GET: {},
    PUT: {},
    POST: {},
    PATCH: {},
    DELETE: {},
  };

  for (let i = 0; i < definitions.length; i++) {
    const definition = definitions[i];
    indexedMap[definition.method][definition.path] = definition;
  }

  return {
    find: (method: string, path: string): Result<Context | null> => {
      const found = indexedMap[method][path];

      if (found) {
        return {
          method,
          matchedPath: found.path,
          path,
          params: {},
          context: found.context,
        };
      }

      return null;
    },
  };
}
