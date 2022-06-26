import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CoreConfig } from 'src/app/core/config';
import { Promotion } from 'src/app/models/promotion.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PromoService {
  fetchedPromotions = new Subject<{
    basicPromos: Promotion[];
    promotions: Promotion[];
  }>();
  promotions = new Subject<Promotion[]>();

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
      this.fetchedPromotions.next({
        basicPromos: fetchedPromotions.basicPromotions,
        promotions: fetchedPromotions.promotions
      });

      let promotions: Promotion[];

      // fetchedPromotions.basicPromotions.forEach((basicPromo: Promotion) => {
      //   fetchedPromotions.promotions.forEach((promo: Promotion) => {
      //     if (promo)
      //   })
      // });
    });
  }

  getConsumerPromos(consumerId: string) {
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) + '/promotions';

    console.log('consumerId', consumerId);
    this.http
      .post(BACKEND_URL, { consumerId })
      .subscribe((fetchedPromotions: any) => {
        // this.fetchedPromotions.next({
        //   basicPromos: fetchedPromotions.basicPromotions,
        //   promotions: fetchedPromotions.promotions
        // });

        // let promotions: Promotion[];

        // fetchedPromotions.basicPromotions.forEach((basicPromo: Promotion) => {
        //   fetchedPromotions.promotions.forEach((promo: Promotion) => {
        //     if (promo)
        //   })
        // });
        console.log(fetchedPromotions);
      });
  }

  addPromo(consumerId: string, promo: Promotion) {
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) +
      '/promotions/';

    let promoData = {
      consumerId,
      ...promo
    };
    console.log(promoData);

    this.http
      .post<{ message: string; promo: Promotion }>(BACKEND_URL, promoData)
      .subscribe((responseData) => {
        console.log(responseData);
        this.router.navigate(['/consumer']);
      });
  }
}
