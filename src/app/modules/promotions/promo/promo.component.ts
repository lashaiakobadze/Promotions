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
  PROMO_TYPE = PromoType;
  CURRENCY = Currency;
  promoImgPath: string;

  step = null;

  @Output() updatedPromo: EventEmitter<Promotion> =
    new EventEmitter<Promotion>();
  @Output() addPromo: EventEmitter<Promotion> = new EventEmitter<Promotion>();
  @Output() deletePromo: EventEmitter<Promotion> =
    new EventEmitter<Promotion>();

  ngOnInit(): void {
    this.promoCount = this.promo.promoCount;
    this.promoImgPath = `assets/promotions/${this.promo.promoType}.jpg`;
  }

  onUpdatedPromo(promo: Promotion) {
    if (typeof this.promoCount !== 'number') {
      return;
    }

    if (!this.promoCount) {
      this.promoCount = 0;
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
    this.addPromo.emit(promo);
  }

  onDeletePromo(promo: Promotion) {
    this.deletePromo.emit(promo);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
    this.promoCount = this.promo.promoCount;
  }
}
