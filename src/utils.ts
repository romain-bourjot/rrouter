export function isPathLengthValid(path: string): boolean {
  return path.length < 1024;
}

export function isMethodSupported(method: string): boolean {
  return method === 'GET' ||
    method === 'POST' ||
    method === 'PATCH' ||
    method === 'PUT' ||
    method === 'DELETE';
}

export function removeTrailingSlash(path: string): string {
  return (path.length > 1 && path[path.length - 1] === '/') ? path.slice(0, -1) : path;
}