import { Definition } from './types';

export function prefix<Context>(str: string, definitions: Definition<Context>[]): Definition<Context>[] {
  return definitions.map((definition: Definition<Context>): Definition<Context> => ({
    ...definition,
    path: str + definition.path,
  }));
}
