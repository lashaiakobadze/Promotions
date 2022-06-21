import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {}

  get(url: string, reqOptions?: any) {
    return this.http.get(url, reqOptions);
  }

  post(url: string, args?: any, reqOptions?: any) {
    return this.http.post(url, args, reqOptions);
  }

  delete(url: string, reqOptions?: any) {
    return this.http.delete(url, reqOptions);
  }
}
