import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { Consumer } from 'src/app/models/consumer.model';

import { ConsumerService } from '../../../services/consumer.service';

@Component({
  selector: 'app-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss']
})
export class ConsumerListComponent implements OnInit, OnDestroy {
  consumers: Consumer[] = [];
  isLoading = false;
  // ToDo: make it also with local storage.
  totalConsumers = 0;
  consumersPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private unsubscribe$: Subject<null> = new Subject();

  constructor(
    public consumersService: ConsumerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.consumersService.getConsumers(this.consumersPerPage, this.currentPage);
    this.userId = this.authService.getUserId();

    this.consumersService
      .getConsumerUpdateListener()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (consumerData: { consumers: Consumer[]; consumerCount: number }) => {
          this.isLoading = false;
          this.totalConsumers = consumerData.consumerCount;
          this.consumers = consumerData.consumers;
        }
      );

    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authService
      .getAuthStatusListener()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isAuthenticated: boolean) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.consumersPerPage = pageData.pageSize;
    this.consumersService.getConsumers(this.consumersPerPage, this.currentPage);
  }

  onDelete(ConsumerId: string) {
    this.isLoading = true;
    this.consumersService.deleteConsumer(ConsumerId).subscribe(
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
