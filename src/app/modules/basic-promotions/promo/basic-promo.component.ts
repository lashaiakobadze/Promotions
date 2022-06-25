import { Component, Input, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models/promotion.model';

@Component({
  selector: 'app-basic-promo',
  templateUrl: './basic-promo.component.html',
  styleUrls: ['./basic-promo.component.scss']
})
export class BasicPromoComponent implements OnInit {
  @Input() promo: Promotion;

  promoImgPath: string;

  constructor() {}

  ngOnInit(): void {
    this.promoImgPath = `assets/promotions/${this.promo.promoType}.jpg`;
  }
}
