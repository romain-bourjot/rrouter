import { Definition, Router, Result } from '../types';

function formatIndexer(method: string, path: string): string {
  return `${method}|${path}`;
}

export function createRouter<Context>(definitions: Definition<Context>[]): Router<Context> {
  const indexedMap = new Map<string, Definition<Context>>();

  for (let i = 0; i < definitions.length; i++) {
    const definition = definitions[i];

    const indexer = formatIndexer(definition.method, definition.path);

    indexedMap.set(indexer, definition);
  }

  return {
    find: (method: string, path: string): Result<Context | null> => {
      const indexer = formatIndexer(method, path);
      const found = indexedMap.get(indexer);

      if (found) {
        return {
          method,
          matchedPath: found.path,
          path,
          params: new Map(),
          context: found.context,
        };
      }

      return null;
    },
  };
}
