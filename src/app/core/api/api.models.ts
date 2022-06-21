export interface APIEndpoint {
  api: string;
  method: APIMethod;
  mock: Array<string>;
  authorization?: boolean;
}

export enum APIMethod {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE'
}
