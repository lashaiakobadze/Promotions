import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import * as coreConfigActions from './config.actions';
import { Configuration } from './core-config.interface';

/**
 * @dynamic
 */
@Injectable()
export class CoreConfig {
  private coreStore: any;

  constructor(
    private store: Store,
    private http: HttpClient,
    @Inject('CoreConfigArgs') private config: any
  ) {
    this.coreStore = config;
  }

  /**
   *
   * @param callbackfn A function that accepts up to one arguments.
   * @returns specified elements of an object. Returns null if not exist specified element in object.
   */
  public select<T>(callbackfn: (value: Configuration) => T): T {
    try {
      return callbackfn(this.coreStore);
    } catch (error) {
      return null;
    }
  }

  /**
   * set property in config object
   *
   * @param key
   * @param value
   * @memberof CoreConfig
   */
  public set(key: string, value: unknown): void {
    this.coreStore[key] = value;
    // set(this.coreStore, key, value);
  }

  /**
   * loads configuration
   *
   * @memberof CoreConfig
   */
  public load(): Observable<unknown> {
    if (this.config.preload && !this.config.path) {
      return of(
        new Error(
          'CoreConfig: Path should be specified when preload is set to True'
        )
      );
    }

    return this.http.get(this.config.path).pipe(
      map((responseData: unknown) => {
        this.coreStore = responseData;
        this.store.dispatch(
          coreConfigActions.SetCoreConfigs({
            config: responseData
          })
        );
        console.log('config loading COMPLETED!!!');
        return responseData;
      })
    );
  }
}
