export enum EProductsWrapType {
  plates = 'plates',
  rows = 'rows'
}

export enum ERequestMethod {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  patch = 'PATCH',
  delete = 'DELETE'
}

export enum EResponseStatus {
  ok = 200,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404
}
