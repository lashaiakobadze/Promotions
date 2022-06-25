import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models/promotion.model';
import { PromoService } from './promo.service';

@Component({
  selector: 'app-basic-promotions',
  templateUrl: './basic-promotions.component.html',
  styleUrls: ['./basic-promotions.component.scss']
})
export class BasicPromotionsComponent implements OnInit {
  promotions: Promotion[];
  constructor(private promoService: PromoService) {}

  ngOnInit(): void {
    this.promoService.getBasicPromos();
    this.promoService.basicPromos.subscribe((promotions: any) => {
      this.promotions = promotions;
    });
  }
}
