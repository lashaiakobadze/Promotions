import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { Consumer } from 'src/app/models/consumer.model';
import { ConsumerService } from '../../../services/consumer.service';

@Component({
  selector: 'app-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsumerListComponent implements OnInit, OnDestroy {
  consumers: Consumer[] = [];
  isLoading = false;
  totalConsumers = 0;
  consumersPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  public filterByNameData = null;
  public filterByPromoData = null;
  private unsubscribe$: Subject<null> = new Subject();

  constructor(
    public consumersService: ConsumerService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.consumersService.getConsumers(this.consumersPerPage, this.currentPage);
    this.userId = this.authService.getUserId();

    this.getLocalData();

    this.consumersService
      .getConsumerUpdateListener()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (consumerData: { consumers: Consumer[]; consumerCount: number }) => {
          this.isLoading = false;
          this.totalConsumers = consumerData.consumerCount;
          this.consumers = consumerData.consumers;
          this.cdr.markForCheck();
        }
      );

    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authService
      .getAuthStatusListener()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isAuthenticated: boolean) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.cdr.markForCheck();
      });
  }

  getLocalData() {
    if (localStorage.getItem('currentPage')) {
      this.currentPage = JSON.parse(localStorage.getItem('currentPage'));
    }

    if (localStorage.getItem('pageSizeOptions')) {
      this.pageSizeOptions = JSON.parse(
        localStorage.getItem('pageSizeOptions')
      );
    }

    if (localStorage.getItem('consumersPerPage')) {
      this.consumersPerPage = JSON.parse(
        localStorage.getItem('consumersPerPage')
      );
    }
  }

  setLocalData() {
    localStorage.setItem('currentPage', JSON.stringify(this.currentPage));
    localStorage.setItem(
      'pageSizeOptions',
      JSON.stringify(this.pageSizeOptions)
    );
    localStorage.setItem(
      'consumersPerPage',
      JSON.stringify(this.consumersPerPage)
    );
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.consumersPerPage = pageData.pageSize;
    this.consumersService.getConsumers(this.consumersPerPage, this.currentPage);

    this.setLocalData();
  }

  onDelete(consumerId: string) {
    this.isLoading = true;
    this.consumersService
      .deleteConsumer(consumerId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.consumersService.getConsumers(
            this.consumersPerPage,
            this.currentPage
          );
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }
}
