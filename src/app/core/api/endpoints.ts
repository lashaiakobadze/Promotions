import { APIEndpoint, APIMethod } from './api.models';

export const BASIC_PROMOTIONS: APIEndpoint = {
  api: 'promotions',
  method: APIMethod.get,
  mock: [''],
  authorization: false
};

export const CONSUMER_PROMOTIONS: APIEndpoint = {
  api: 'promotions/consumer',
  method: APIMethod.post,
  mock: [''],
  authorization: true
};

export const ADD_PROMO: APIEndpoint = {
  api: 'promotions',
  method: APIMethod.post,
  mock: [''],
  authorization: true
};

export const UPDATE_PROMO: APIEndpoint = {
  api: 'promotions',
  method: APIMethod.put,
  mock: [''],
  authorization: true
};

export const DELETE_PROMO: APIEndpoint = {
  api: 'promotions',
  method: APIMethod.delete,
  mock: [''],
  authorization: true
};

export const GET_CONSUMER: APIEndpoint = {
  api: 'consumers/{{id}}',
  method: APIMethod.get,
  mock: [''],
  authorization: true
};

export const ADD_CONSUMER: APIEndpoint = {
  api: 'consumers',
  method: APIMethod.post,
  mock: [''],
  authorization: true
};

export const UPDATE_CONSUMER: APIEndpoint = {
  api: '/consumers/{{id}}',
  method: APIMethod.put,
  mock: [''],
  authorization: true
};

export const DELETE_CONSUMER: APIEndpoint = {
  api: 'consumers/{{id}}',
  method: APIMethod.delete,
  mock: [''],
  authorization: true
};

export const CREATE_USER: APIEndpoint = {
  api: 'user/signup',
  method: APIMethod.post,
  mock: [''],
  authorization: false
};

export const LOGIN_USER: APIEndpoint = {
  api: 'user/login',
  method: APIMethod.post,
  mock: [''],
  authorization: false
};
