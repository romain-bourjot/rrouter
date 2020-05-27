import { Definition, Router, Result } from './types';
import {
  removeTrailingSlash,
  isPathLengthValid,
  isMethodSupported,
} from './utils';

import { createRouter as createMapRouter } from './impls/map';
import { createRouter as createTreeRouter } from './impls/tree';

function validateDefinition(definition: Definition<any>): string | null {
  if (!isPathLengthValid(definition.path)) {
    return `Invalid definition, path is too long: ${definition.method} ${definition.path}`;
  }

  if (!isMethodSupported(definition.method)) {
    return `Invalid definition, unsupported method: ${definition.method} ${definition.path}`;
  }

  return null;
}

type IndexResult<Context> = { treeRouter: Router<Context>, mapRouter: Router<Context>};

function index<Context>(definitions: Definition<Context>[]): IndexResult<Context> {
  const mapDefinitions: Definition<Context>[] = [];
  const treeDefinitions: Definition<Context>[] = [];

  for (let i = 0; i < definitions.length; i++) {
    const definition = definitions[i];
    definition.path = removeTrailingSlash(definition.path);

    const validationError = validateDefinition(definition);
    if (validationError) {
      throw new Error(validationError);
    }

    if (definition.path.includes('/:')) {
      treeDefinitions.push(definition);
    } else {
      mapDefinitions.push(definition);
    }
  }

  return {
    mapRouter: createMapRouter(mapDefinitions),
    treeRouter: createTreeRouter(treeDefinitions),
  };
}

export function createRouter<Context>(definitions: Definition<Context>[]): Router<Context> {
  const { mapRouter, treeRouter } = index(definitions);

  return {
    find: (method: string, rawPath: string): Result<Context | null> => {
      if (!isMethodSupported(method) || !isPathLengthValid(rawPath)) {
        return null;
      }

      const path = removeTrailingSlash(rawPath);

      return mapRouter.find(method, path) || treeRouter.find(method, path);
    },
  };
}
