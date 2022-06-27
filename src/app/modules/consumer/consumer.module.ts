import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from 'src/app/angular-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { translateProviders } from 'src/app/localization.module';

import { ConsumerCreateComponent } from './consumer-create/consumer-create.component';
import { ConsumerListComponent } from './consumer-list/consumer-list.component';
import { ConsumerRoutingModule } from './consumer.routing';
import { PromotionsModule } from '../promotions/promotions.module';
import { ConsumerComponent } from './consumer-list/consumer/consumer.component';
import { FilterByNamePipe } from 'src/app/shared/pipes/filter.pipe';
import { FilterByPromoPipe } from 'src/app/shared/pipes/filterPromo.pipe';

@NgModule({
  declarations: [
    ConsumerCreateComponent,
    ConsumerListComponent,
    ConsumerComponent,
    FilterByNamePipe,
    FilterByPromoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule,
    TranslateModule.forRoot(translateProviders),
    ConsumerRoutingModule,
    PromotionsModule
  ]
})
export class ConsumerModule {}
