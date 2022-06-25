import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PromotionsContentComponent,
  PromotionsComponent
} from './promotions.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PromoComponent } from './promo/promo.component';

@NgModule({
  declarations: [
    PromotionsComponent,
    PromotionsContentComponent,
    PromoComponent
  ],
  imports: [CommonModule, AngularMaterialModule],
  exports: [PromotionsComponent]
})
export class PromotionsModule {}
