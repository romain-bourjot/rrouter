interface Result<Context> {
  method: string;
  matchedPath: string;
  path: string;
  params: Map<string, string>;
  context: Context;
}

export interface Definition<Context> {
  method: string;
  path: string;
  context: Context;
}

type Find<Context> = (method: string, path: string) => Result<Context> | null;

export interface Router<Context> {
  find: Find<Context>;
}

function formatIndexer(method: string, path: string): string {
  return `${method}|${path}`;
}

function isPathLengthValid(path: string): boolean {
  return path.length < 1024;
}

function isMethodSupported(method: string): boolean {
  if (method === 'GET') {
    return true;
  }

  if (method === 'POST') {
    return true;
  }

  if (method === 'PATCH') {
    return true;
  }

  if (method === 'PUT') {
    return true;
  }

  if (method === 'DELETE') {
    return true;
  }

  return false;
}

export function createRouter<Context>(definitions: Definition<Context>[]): Router<Context> {
  const indexedMap = new Map<string, Definition<Context>>();

  for (let i = 0; i < definitions.length; i++) {
    const definition = definitions[i];

    if (!isPathLengthValid(definition.path)) {
      throw new Error(`Invalid definition, path is too long: ${definition.method} ${definition.path}`);
    }

    if (!isMethodSupported(definition.method)) {
      throw new Error(`Invalid definition, unsupported method: ${definition.method} ${definition.path}`);
    }

    const indexer = formatIndexer(definition.method, definition.path);

    indexedMap.set(indexer, definition);
  }

  return {
    find: (method: string, path: string): Result<Context | null> => {
      if (!isMethodSupported(method)) {
        return null;
      }

      if (!isPathLengthValid(path)) {
        return null;
      }

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
