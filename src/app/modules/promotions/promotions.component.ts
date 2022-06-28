import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Consumer } from 'src/app/models/consumer.model';
import { Promotion } from 'src/app/models/promotion.model';
import { PromoType } from 'src/app/models/promoType.enum';
import { PromoService } from '../../services/promo.service';

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
  }
}

@Component({
  templateUrl: 'promotions-content.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionsContentComponent implements OnInit, OnDestroy {
  consumerId: string;
  updatedPromo: Promotion = null;
  PROMO_TYPE = PromoType;
  promotions: Promotion[];
  private unsubscribe$: Subject<null> = new Subject();

  constructor(
    public modal: MatDialog,
    public dialogRef: MatDialogRef<PromotionsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private promoService: PromoService,
    private cdr: ChangeDetectorRef
  ) {
    this.consumerId = data.pageValue;
  }

  ngOnInit(): void {
    this.promoService.fetchConsumerPromos(this.consumerId);

    this.promoService.consumerPromos
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((fetchedPromotions: any) => {
        this.promotions = fetchedPromotions;

        this.cdr.markForCheck();
      });
  }

  onUpdatePromo(promo: Promotion) {
    this.updatedPromo = promo;
    this.promoService.updatePromo(this.consumerId, promo);
  }

  onAddPromo(promo: Promotion) {
    this.promoService.addPromo(this.consumerId, promo);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }
}
