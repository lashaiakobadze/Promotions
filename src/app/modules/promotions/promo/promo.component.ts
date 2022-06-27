import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Currency } from 'src/app/models/currency.enum';
import { Promotion } from 'src/app/models/promotion.model';
import { PromoType } from 'src/app/models/promoType.enum';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {
  @Input() promo: Promotion;

  promoCount: number;
  promoCurrency: Currency;
  PROMO_TYPE = PromoType;
  CURRENCY = Currency;
  promoImgPath: string;

  step = null;

  @Output() updatedPromo: EventEmitter<Promotion> =
    new EventEmitter<Promotion>();
  @Output() addPromo: EventEmitter<Promotion> = new EventEmitter<Promotion>();

  ngOnInit(): void {
    this.promoCount = this.promo.promoCount;
    this.promoCurrency = this.promo?.currency;
    this.promoImgPath = `assets/promotions/${this.promo.promoType}.jpg`;
  }

  onUpdatedPromo(promo: Promotion) {
    if (typeof this.promoCount !== 'number') {
      return;
    }

    if (!this.promoCount) {
      this.promoCount = 0;
    }

    if (promo?.currency) {
      promo.currency = this.promoCurrency;
    }

    promo.promoCount = this.promoCount;
    this.updatedPromo.emit(promo);
  }

  onAddPromo(promo: Promotion) {
    if (typeof this.promoCount !== 'number') {
      return;
    }

    if (!this.promoCount) {
      this.promoCount = 0;
    }

    promo.promoCount = this.promoCount;

    if (this.promoCount === 0) {
      this.onDeletePromo(promo);
    } else {
      this.addPromo.emit(promo);
    }
  }

  onDeletePromo(promo: Promotion) {
    this.promoCount = 0;
    promo.promoCount = this.promoCount;
    this.onUpdatedPromo(promo);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
    this.promoCount = this.promo.promoCount;
  }
}
