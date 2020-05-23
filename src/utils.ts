export function isPathLengthValid(path: string): boolean {
  return path.length < 1024;
}

export function isMethodSupported(method: string): boolean {
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

export function removeTrailingSlash(path: string): string {
  return (path.length > 1 && path[path.length - 1] === '/') ? path.slice(0, -1) : path;
}