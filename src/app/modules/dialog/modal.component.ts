import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Consumer } from 'src/app/models/consumer.model';
import { PromoType } from 'src/app/models/promoType.enum';
import { PromoService } from '../promotions/promo.service';

/**
 * @title Modal with header, scrollable content and actions
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @Input() modalTitle: string;
  @Input() consumer: Consumer;

  dialogValue: string;
  sendValue: string;

  constructor(public modal: MatDialog) {}

  openModal() {
    this.sendValue = this.consumer.id;
    const dialogRef = this.modal.open(DialogContentComponent, {
      data: { pageValue: this.sendValue }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Modal result: ${result}`);

      this.dialogValue = result?.data;
    });
  }
}

@Component({
  selector: 'app-modal-content',
  templateUrl: 'modal-content.html'
})
export class DialogContentComponent {
  fromPage: string;
  fromDialog = 'Dialog data';
  PROMO_TYPE = PromoType;

  constructor(
    public modal: MatDialog,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private promoService: PromoService
  ) {
    this.fromPage = data.pageValue;
  }

  onAddPromo(consumerId: string, promoType: PromoType) {
    this.fromDialog = consumerId;
    this.promoService.addPromo(consumerId, promoType);
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }
}
