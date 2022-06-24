import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from 'src/app/angular-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { translateProviders } from 'src/app/localization.module';

import { ConsumerContainerComponent } from './consumer-container.component';
// import { ConsumerCreateComponent } from '../../modules/consumer/consumer-create/consumer-create.component';
// import { ConsumerListComponent } from '../../modules/consumer/consumer-list/consumer-list.component';
import { ConsumerRoutingModule } from './consumer-container.routing';

@NgModule({
  declarations: [
    ConsumerContainerComponent
    // ConsumerCreateComponent,
    // ConsumerListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    TranslateModule.forRoot(translateProviders),
    ConsumerRoutingModule
  ]
})
export class ConsumerContainerModule {}
