import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MonoTypeOperatorFunction, Subject } from 'rxjs';

import {
  ApiService,
  ADD_PROMO,
  BASIC_PROMOTIONS,
  CONSUMER_PROMOTIONS,
  DELETE_PROMO,
  UPDATE_PROMO
} from '../core/api';
import { Promotion } from 'src/app/models/promotion.model';

@Injectable({ providedIn: 'root' })
export class PromoService {
  pipe(arg0: MonoTypeOperatorFunction<unknown>) {
    throw new Error('Method not implemented.');
  }
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

  // ToDo delete.
  deletePromo(consumerId: string, promo: Promotion) {
    const promoData = {
      ...promo,
      consumerId,
      basicPromo: false
    };
    console.log(promoData);

    this.apiService
      .apiCall(DELETE_PROMO, consumerId.toString())
      .subscribe(() => this.fetchConsumerPromos(consumerId));
  }
}
