import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { Promotion } from 'src/app/models/promotion.model';
import { PromoService } from '../../services/promo.service';

@Component({
  selector: 'app-basic-promotions',
  templateUrl: './basic-promotions.component.html',
  styleUrls: ['./basic-promotions.component.scss']
})
export class BasicPromotionsComponent implements OnInit, OnDestroy {
  promotions: Promotion[];
  userIsAuthenticated: boolean;
  private unsubscribe$: Subject<null> = new Subject();

  constructor(
    private authService: AuthService,
    private promoService: PromoService
  ) {}

  ngOnInit(): void {
    this.promoService.getBasicPromos();

    this.promoService.basicPromos
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((fetchedPromotions: any) => {
        this.promotions = fetchedPromotions;
      });

    this.authService
      .getAuthStatusListener()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isAuthenticated: boolean) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }
}
