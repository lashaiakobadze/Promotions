import { Component, Input, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models/promotion.model';
import { PromoType } from 'src/app/models/promoType.enum';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {
  @Input() promo: Promotion;

  promoImgPath: string;

  constructor() {}

  ngOnInit(): void {
    this.promoImgPath = `assets/promotions/${this.promo.promoType}.jpg`;
  }
}
