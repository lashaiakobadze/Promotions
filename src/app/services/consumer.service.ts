import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Consumer } from '../models/consumer.model';
import { CoreConfig } from 'src/app/core/config';
import {
  ApiService,
  ADD_CONSUMER,
  GET_CONSUMER,
  DELETE_CONSUMER,
  UPDATE_CONSUMER
} from '../core/api';

@Injectable({ providedIn: 'root' })
export class ConsumerService {
  private consumers: Consumer[] = [];
  private consumersUpdated = new Subject<{
    consumers: Consumer[];
    consumerCount: number;
  }>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private coreConfig: CoreConfig,
    private apiService: ApiService
  ) {}

  getConsumerUpdateListener() {
    return this.consumersUpdated.asObservable();
  }

  getConsumer(id: string) {
    const url = { ...GET_CONSUMER };
    url.api = url.api.replace('{{id}}', id.toString());

    return this.apiService.apiCall(url);
  }

  /**
   * Add new consumer
   * @param consumer
   */
  addConsumer(consumer: Consumer) {
    const consumerData = new FormData();

    consumerData.append('firstName', consumer.firstName);
    consumerData.append('lastName', consumer.lastName);
    consumerData.append('gender', consumer.gender);
    consumerData.append('personalNumber', consumer.personalNumber + '');
    consumerData.append('phone', consumer.phone + '');
    consumerData.append('address', consumer.address);
    consumerData.append('country', consumer.country);
    consumerData.append('city', consumer.city);
    consumerData.append('email', consumer.email);
    consumerData.append('image', consumer.image, consumer.firstName);

    this.apiService.apiCall(ADD_CONSUMER, consumerData).subscribe(() => {
      this.router.navigate(['/consumer']);
    });
  }

  deleteConsumer(id: string) {
    const url = { ...DELETE_CONSUMER };
    url.api = url.api.replace('{{id}}', id.toString());

    return this.apiService.apiCall(url);
  }

  updateConsumer(consumer: Consumer) {
    const url = { ...UPDATE_CONSUMER };
    const BACKEND_URL = this.coreConfig.select(
      (r) => r.environment.api.dev.path
    );
    url.api = url.api.replace('{{id}}', consumer.id.toString());
    const updateUrl = BACKEND_URL + url.api;
    let consumerData: Consumer | FormData;

    if (typeof consumer.image === 'object') {
      consumerData = new FormData();
      consumerData.append('id', consumer.id);
      consumerData.append('firstName', consumer.firstName);
      consumerData.append('lastName', consumer.lastName);
      consumerData.append('gender', consumer.gender);
      consumerData.append('personalNumber', consumer.personalNumber + '');
      consumerData.append('phone', consumer.phone + '');
      consumerData.append('address', consumer.address);
      consumerData.append('country', consumer.country);
      consumerData.append('city', consumer.city);
      consumerData.append('email', consumer.email);
      consumerData.append('image', consumer.image, consumer.firstName);
    } else {
      consumerData = {
        id: consumer.id,
        firstName: consumer.firstName,
        lastName: consumer.lastName,
        gender: consumer.gender,
        personalNumber: consumer.personalNumber,
        phone: consumer.phone,
        address: consumer.address,
        country: consumer.country,
        city: consumer.city,
        email: consumer.email,
        imagePath: consumer.image,
        creator: null
      };
    }

    // ToDo: make it with apiCall, Should be added formData configuration in core.
    this.http.put(updateUrl, consumerData).subscribe(() => {
      this.router.navigate(['/consumer']);
    });
  }

  getConsumers(consumersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${consumersPerPage}&page=${currentPage}`;
    const BACKEND_URL =
      this.coreConfig.select((r) => r.environment.api.dev.path) + '/consumers/';

    this.http
      .get<{ message: string; consumers: any; maxConsumers: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((consumerData) => {
          return {
            consumers: consumerData.consumers.map((consumer) => {
              return {
                ...consumer,
                id: consumer._id
              };
            }),
            maxConsumers: consumerData.maxConsumers
          };
        })
      )
      .subscribe((transformedConsumerData) => {
        this.consumers = transformedConsumerData.consumers;
        this.consumersUpdated.next({
          consumers: [...this.consumers],
          consumerCount: transformedConsumerData.maxConsumers
        });
      });
  }
}
