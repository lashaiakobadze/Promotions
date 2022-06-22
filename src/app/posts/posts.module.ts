import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConsumerCreateComponent } from './post-create/post-create.component';
import { ConsumerListComponent } from './post-list/post-list.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [ConsumerCreateComponent, ConsumerListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class ConsumerModule {}
