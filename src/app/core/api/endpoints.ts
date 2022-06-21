import { APIEndpoint, APIMethod } from './api.models';

export const COUNTRY_URL: APIEndpoint = {
  api: 'v3/covid-19/all',
  method: APIMethod.get,
  mock: [''],
  authorization: false
};

export const CREATE_USER: APIEndpoint = {
  api: 'api/user/signup',
  method: APIMethod.post,
  mock: [''],
  authorization: false
};

export const LOG_IN_USER: APIEndpoint = {
  api: '/api/Login',
  method: APIMethod.post,
  mock: [''],
  authorization: false
};
