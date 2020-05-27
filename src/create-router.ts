import { Definition, Router, Result } from './types';
import {
  removeTrailingSlash,
  isPathLengthValid,
  isMethodSupported,
} from './utils';

import { createRouter as createMapRouter } from './impls/map';
import { createRouter as createTreeRouter } from './impls/tree';

export function createRouter<Context>(definitions: Definition<Context>[]): Router<Context> {
  const mapDefinitions: Definition<Context>[] = [];
  const treeDefinitions: Definition<Context>[] = [];

  for (let i = 0; i < definitions.length; i++) {
    const definition = definitions[i];
    definition.path = removeTrailingSlash(definition.path);

    if (!isPathLengthValid(definition.path)) {
      throw new Error(`Invalid definition, path is too long: ${definition.method} ${definition.path}`);
    }

    if (!isMethodSupported(definition.method)) {
      throw new Error(`Invalid definition, unsupported method: ${definition.method} ${definition.path}`);
    }

    if (definition.path.includes('/:')) {
      treeDefinitions.push(definition);
    } else {
      mapDefinitions.push(definition);
    }
  }

  const mapRouter = createMapRouter(mapDefinitions);
  const treeRouter = createTreeRouter(treeDefinitions);

  return {
    find: (method: string, rawPath: string): Result<Context | null> => {
      if (!isMethodSupported(method)) {
        return null;
      }

      if (!isPathLengthValid(rawPath)) {
        return null;
      }

      const path = removeTrailingSlash(rawPath);

      return mapRouter.find(method, path) || treeRouter.find(method, path);
    },
  };
}
