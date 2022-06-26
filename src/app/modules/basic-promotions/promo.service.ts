import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CoreConfig } from 'src/app/core/config';
import { Promotion } from 'src/app/models/promotion.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PromoService {
  basicPromos = new Subject<Promotion[]>();
  consumerPromos = new Subject<Promotion[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private coreConfig: CoreConfig
  ) {}

  getBasicPromos() {
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) +
      '/promotions/';

    this.http.get(BACKEND_URL).subscribe((fetchedPromotions: any) => {
      this.basicPromos.next(fetchedPromotions.basicPromotions);
    });
  }

  fetchConsumerPromos(consumerId: string) {
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) +
      '/promotions/consumer';

    console.log('consumerId', consumerId);
    this.http
      .post(BACKEND_URL, { consumerId })
      .subscribe((fetchedPromotions: any) => {
        this.consumerPromos.next(fetchedPromotions.promotions);
      });
  }

  addPromo(consumerId: string, promo: Promotion) {
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) +
      '/promotions/';

    let promoData = {
      ...promo,
      consumerId,
      basicPromo: false
    };

    this.http
      .post<{ message: string; promo: Promotion }>(BACKEND_URL, promoData)
      .subscribe((responseData) => {
        console.log(responseData);
        this.router.navigate(['/consumer']);
      });
  }

  updatePromo(consumerId: string, promo: Promotion) {
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) +
      '/promotions/';

    let promoData = {
      ...promo,
      consumerId,
      basicPromo: false
    };
    console.log(promoData);

    this.http
      .put<{ message: string; promo: Promotion }>(BACKEND_URL, promoData)
      .subscribe((responseData) => {
        this.router.navigate(['/consumer']);

        return this.fetchConsumerPromos(consumerId);
      });
  }

  deletePromo(consumerId: string, promo: Promotion) {
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) +
      '/promotions/';

    let promoData = {
      ...promo,
      consumerId,
      basicPromo: false
    };
    console.log(promoData);

    // this.http.delete(BACKEND_URL, promoData).subscribe((responseData) => {
    //   console.log(responseData);
    //   this.router.navigate(['/consumer']);
    // });
  }
}
