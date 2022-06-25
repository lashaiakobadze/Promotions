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

  PROMO_TYPE = PromoType;
  CURRENCY = Currency;
  promoImgPath: string;

  step = null;

  @Output() updatedPromo: EventEmitter<Promotion> =
    new EventEmitter<Promotion>();

  ngOnInit(): void {
    this.promoImgPath = `assets/promotions/${this.promo.promoType}.jpg`;
  }

  onAddPromo(promo: Promotion) {
    this.updatedPromo.emit(promo);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }
}
