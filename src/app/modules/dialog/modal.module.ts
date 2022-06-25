import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContentComponent, ModalComponent } from './modal.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [ModalComponent, DialogContentComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [ModalComponent]
})
export class ModalModule {}
