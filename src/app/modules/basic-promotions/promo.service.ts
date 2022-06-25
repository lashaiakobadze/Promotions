import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CoreConfig } from 'src/app/core/config';
import { Promotion } from 'src/app/models/promotion.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PromoService {
  basicPromos = new Subject<Promotion[]>();

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

  addPromo(consumerId: string, promo: Promotion) {
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) +
      '/promotions/';

    let promoData: Promotion;

    promoData = {
      consumerId,
      promoId: promo.promoId,
      promoType: promo.promoType,
      promoCount: promo.promoCount,
      currency: promo.currency
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
