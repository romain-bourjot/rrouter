export interface Definition<Context> {
  method: string;
  path: string;
  context: Context;
}

type Find<Context> = (method: string, path: string) => Result<Context> | null;

export interface Router<Context> {
  find: Find<Context>;
}

export interface Result<Context> {
  method: string;
  matchedPath: string;
  path: string;
  params: { [key: string]: string };
  context: Context;
}