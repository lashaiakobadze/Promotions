import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsComponent } from './promotions.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PromoComponent } from './promo/promo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PromotionsComponent, PromoComponent],
  imports: [CommonModule, RouterModule, AngularMaterialModule]
})
export class PromotionsModule {}
