import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { UrlQueryParams } from './urlQueryParams';
import { APIEndpoint, APIMethod } from './api.models';
import { RestService } from './rest.service';
import { CoreConfig } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token: string;
  private httpOptions = {};
  private language: string;

  constructor(private restService: RestService, private config: CoreConfig) {
    this.token = 'token';
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token
      })
    };
  }

  /**
   *
   * @param [endpoint]
   * @param [args]
   * s {Observable<any>}
   * @memberof ApiService
   */
  apiCall(endpoint?: APIEndpoint, args?: any, pathPar?: any): Observable<any> {
    let localArgs = args || {};
    const isMock: boolean =
      this.config.select((r) => r.environment.api.mock.enable) || !endpoint.api;

    let api: any = isMock
      ? this.config.select((r) => r.environment.api.mock.path)
      : this.config.select((r) => r.environment.api.dev.path);

    let end: any = isMock ? endpoint.mock : endpoint.api;

    if (isMock) {
      const index = Math.floor(Math.random() * end.length);
      endpoint.method = APIMethod.get;
      end = end[index];
      if (end) {
        end = end.replace('{{lang}}', this.language);
        for (const key in pathPar) {
          if (Object.prototype.hasOwnProperty.call(pathPar, key)) {
            const value = pathPar[key];
            end = end.replace(`{{id}}`, value);
          }
        }
      }
    }

    let reqOptions = {};
    if (endpoint.authorization && !this.token && !isMock) {
      throw new Error(endpoint.api + ' is authorized');
    }

    if (endpoint.authorization) {
      reqOptions = this.httpOptions;
    }

    if (!api) {
      api = '../../../mock_data';
    }

    let url = `${api}/${end}`;
    let queryParams: UrlQueryParams;

    for (const key in pathPar) {
      if (
        Object.prototype.hasOwnProperty.call(pathPar, key) &&
        localArgs[key]
      ) {
        delete localArgs[key];
      }
    }

    if (localArgs && !isMock) {
      if (endpoint.method !== APIMethod.post && !localArgs.ln) {
        localArgs = {
          ...localArgs,
          ln: this.language
        };
      }
      queryParams = new UrlQueryParams(localArgs);
    }

    switch (endpoint.method) {
      case APIMethod.get:
        url += localArgs !== undefined ? (queryParams ? queryParams : '') : '';
        return this.restService.get(url, reqOptions);
      case APIMethod.post:
        return this.restService.post(
          `${url}ln=${this.language}`,
          localArgs,
          reqOptions
        );
      case APIMethod.delete:
        return this.restService.delete(url, reqOptions);
      default:
        return new Observable<Object>();
    }
  }

  setLanguage(lang: string) {
    this.language = lang;
  }
}
