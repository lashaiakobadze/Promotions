import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Consumer } from 'src/app/models/consumer.model';
import { Promotion } from 'src/app/models/promotion.model';
import { PromoType } from 'src/app/models/promoType.enum';
import { PromoService } from '../basic-promotions/promo.service';

/**
 * @title Modal with header, scrollable content and actions
 */
@Component({
  selector: 'app-promotions-modal',
  templateUrl: './promotions.component.html'
})
export class PromotionsComponent {
  @Input() modalTitle: string;
  @Input() consumer: Consumer;

  updatedValue: string;
  sendValue: string;

  constructor(public modal: MatDialog) {}

  openModal() {
    this.sendValue = this.consumer.id;
    const dialogRef = this.modal.open(PromotionsContentComponent, {
      data: { pageValue: this.sendValue }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Updated result: ${result}`);

      this.updatedValue = result?.data;
    });
  }
}

@Component({
  templateUrl: 'promotions-content.html'
})
export class PromotionsContentComponent implements OnInit {
  consumerId: string;
  updatedPromo: Promotion = null;
  PROMO_TYPE = PromoType;
  promotions: Promotion[];
  basicPromotions: Promotion[];

  constructor(
    public modal: MatDialog,
    public dialogRef: MatDialogRef<PromotionsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private promoService: PromoService
  ) {
    this.consumerId = data.pageValue;
  }

  ngOnInit(): void {
    this.promoService.fetchConsumerPromos(this.consumerId);
    this.promoService.consumerPromos.subscribe((fetchedPromotions: any) => {
      this.promotions = fetchedPromotions;
    });
  }

  onUpdatePromo(promo: Promotion) {
    this.updatedPromo = promo;
    this.promoService.updatePromo(this.consumerId, promo);
  }

  onAddPromo(promo: Promotion) {
    this.promoService.addPromo(this.consumerId, promo);
  }

  onDeletePromo(promo: Promotion) {
    this.promoService.deletePromo(this.consumerId, promo);
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.updatedPromo });
  }

  step = null;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
