import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicPromotionsComponent } from './basic-promotions.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { BasicPromoComponent } from './promo/basic-promo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BasicPromotionsComponent, BasicPromoComponent],
  imports: [CommonModule, RouterModule, AngularMaterialModule]
})
export class BasicPromotionsModule {}
