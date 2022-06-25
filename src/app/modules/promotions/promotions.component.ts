import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models/promotion.model';
import { PromoService } from './promo.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  promotions: Promotion[];
  constructor(private promoService: PromoService) {}

  ngOnInit(): void {
    this.promoService.getBasicPromos();
    this.promoService.basicPromos.subscribe((promotions: any) => {
      this.promotions = promotions;
    });
  }
}
