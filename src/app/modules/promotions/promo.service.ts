import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CoreConfig } from 'src/app/core/config';

@Injectable({ providedIn: 'root' })
export class PromoService {
  constructor(private http: HttpClient, private coreConfig: CoreConfig) {}

  getPromos() {
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) +
      '/promotions/';

    return this.http.get(BACKEND_URL);
  }
}
