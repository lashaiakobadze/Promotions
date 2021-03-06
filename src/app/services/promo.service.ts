import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import {
  ApiService,
  ADD_PROMO,
  BASIC_PROMOTIONS,
  CONSUMER_PROMOTIONS,
  UPDATE_PROMO
} from '../core/api';
import { Promotion } from 'src/app/models/promotion.model';

@Injectable({ providedIn: 'root' })
export class PromoService {
  basicPromos = new Subject<Promotion[]>();
  consumerPromos = new Subject<Promotion[]>();

  constructor(private router: Router, private apiService: ApiService) {}

  getBasicPromos() {
    this.apiService
      .apiCall(BASIC_PROMOTIONS)
      .subscribe((fetchedPromotions: any) => {
        this.basicPromos.next(fetchedPromotions.basicPromotions);
      });
  }

  fetchConsumerPromos(consumerId: string) {
    this.apiService
      .apiCall(CONSUMER_PROMOTIONS, { consumerId })
      .subscribe((fetchedPromotions: any) => {
        this.consumerPromos.next(fetchedPromotions.promotions);
      });
  }

  addPromo(consumerId: string, promo: Promotion) {
    const promoData = {
      ...promo,
      consumerId,
      basicPromo: false
    };

    this.apiService
      .apiCall(ADD_PROMO, promoData)
      .subscribe(() => this.fetchConsumerPromos(consumerId));
  }

  updatePromo(consumerId: string, promo: Promotion) {
    const promoData = {
      ...promo,
      consumerId,
      basicPromo: false
    };

    this.apiService
      .apiCall(UPDATE_PROMO, promoData)
      .subscribe(() => this.fetchConsumerPromos(consumerId));
  }
}
