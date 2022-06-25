import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { Consumer } from 'src/app/models/consumer.model';

import { ConsumerService } from '../consumer.service';

@Component({
  selector: 'app-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss']
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
  private consumersSub: Subscription;
  private authStatusSub: Subscription;

  openDialog = false;

  constructor(
    public consumersService: ConsumerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.consumersService.getConsumers(this.consumersPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.consumersSub = this.consumersService
      .getConsumerUpdateListener()
      .subscribe(
        (consumerData: { consumers: Consumer[]; consumerCount: number }) => {
          this.isLoading = false;
          this.totalConsumers = consumerData.consumerCount;
          this.consumers = consumerData.consumers;
        }
      );
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
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

  onAddPromotion(ConsumerId: string) {
    this.openDialog = true;

    // this.isLoading = true;
    // this.consumersService.deleteConsumer(ConsumerId).subscribe(
    //   () => {
    //     this.consumersService.getConsumers(
    //       this.consumersPerPage,
    //       this.currentPage
    //     );
    //   },
    //   () => {
    //     this.isLoading = false;
    //   }
    // );
  }

  onPromoAdded() {
    this.openDialog = false;
  }

  ngOnDestroy() {
    this.consumersSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
