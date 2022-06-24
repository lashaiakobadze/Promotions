import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { Consumer } from 'src/app/models/consumer.model';
import { ConsumerService } from 'src/app/modules/consumer/consumer.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-consumer-container',
  templateUrl: './consumer-container.component.html',
  styleUrls: ['./consumer-container.component.scss']
})
export class ConsumerContainerComponent implements OnInit {
  userIsAuthenticated = false;
  userId: string;
  private unsubscribe$: Subject<null> = new Subject();
  consumerListMode = true;
  consumerCreateMode = false;

  /**
   * for consumer list
   */
  consumers: Consumer[] = [];
  isLoading = true;
  totalConsumers = 0;
  consumersPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  /**
   * for consumer create
   */
  consumer: Consumer;
  mode = 'create';
  id: string;

  constructor(
    public consumersService: ConsumerService,
    private authService: AuthService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let resolvedUrl = '';
    this.authService.autoAuthUser();

    this.router.events.subscribe(
      (event: { id: number; url: string; urlAfterRedirects: string }) => {
        if (event.constructor.name === 'NavigationEnd') {
          resolvedUrl = event.url;
          // console.log(resolvedUrl);
          if (resolvedUrl === '/consumer') {
            this.consumerListMode = true;
            this.consumerCreateMode = false;
            // console.log('this.consumerCreateMode', this.consumerListMode);
          }

          if (resolvedUrl === '/consumer/create') {
            this.consumerCreateMode = true;
            this.consumerListMode = false;
            // console.log('this.consumerListMode', this.consumerListMode);
          }
        }
      }
    );

    /**
     * checks if user is authenticated
     */
    this.authService
      .getAuthStatusListener()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.isLoading = false;

        console.log('this.userIsAuthenticated', this.userIsAuthenticated);
        console.log('this.userId', this.userId);
      });

    /**
     * for consumer list
     */
    // this.isLoading = true;
    this.consumersService.getConsumers(this.consumersPerPage, this.currentPage);

    this.consumersService
      .getConsumerUpdateListener()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (consumerData: { consumers: Consumer[]; consumerCount: number }) => {
          this.isLoading = false;
          this.totalConsumers = consumerData.consumerCount;
          this.consumers = consumerData.consumers;
          // console.log('this.consumers', this.consumers);
        }
      );

    /**
     * for consumer create
     */
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('consumerId')) {
        this.mode = 'edit';
        this.id = paramMap.get('consumerId');
        this.isLoading = true;

        this.consumersService
          .getConsumer(this.id)
          .subscribe((consumerData: any) => {
            this.isLoading = false;

            this.consumer = {
              id: consumerData?._id,
              firstName: consumerData?.firstName,
              lastName: consumerData?.lastName,
              gender: consumerData?.gender,
              personalNumber: consumerData?.personalNumber,
              phone: consumerData?.phone, // ToDo: number validator
              address: consumerData?.address,
              country: consumerData?.country,
              city: consumerData?.city,
              email: consumerData?.email,
              imagePath: consumerData?.imagePath,
              creator: consumerData?.creator
            };
          });
      } else {
        this.mode = 'create';
        this.id = null;
      }
    });
  }

  /**
   * for consumer list
   */
  // onChangedPage(pageData: PageEvent) {
  //   this.isLoading = true;
  //   this.currentPage = pageData.pageIndex + 1;
  //   this.consumersPerPage = pageData.pageSize;
  //   this.consumersService.getConsumers(this.consumersPerPage, this.currentPage);
  // }

  // onDelete(ConsumerId: string) {
  //   this.isLoading = true;
  //   this.consumersService.deleteConsumer(ConsumerId).subscribe(
  //     () => {
  //       this.consumersService.getConsumers(
  //         this.consumersPerPage,
  //         this.currentPage
  //       );
  //     },
  //     () => {
  //       this.isLoading = false;
  //     }
  //   );
  // }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
    // this.unsubscribe$.next();
    // this.unsubscribe$.complete();

    // console.log('delted');
  }
}
