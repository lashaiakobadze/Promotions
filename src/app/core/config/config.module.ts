import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { CoreConfig } from './config.service';
import { CoreConfigArgs } from './config.args';
import { CoreConfigReducer } from './config.reducer';

/**
 * get coreConfig service instance and calls its load method
 *
 * @export
 * @param instance
 */
export function coreConfigFactory(instance: CoreConfig) {
  return () => instance.load();
}
/**
 * @dynamic
 */
@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('coreConfig', CoreConfigReducer)
  ]
})
export class CoreConfigModule {
  static forRoot(
    config: CoreConfigArgs
  ): ModuleWithProviders<CoreConfigModule> {
    // Return ng module
    return {
      ngModule: CoreConfigModule,
      providers: [
        // CoreConfig Service itself
        CoreConfig,
        // Add CoreCofnigArgs as provider
        {
          provide: 'CoreConfigArgs',
          useValue: config
        },
        // Add APP_INITIALIZER as provider with CoreConfigFactory
        {
          provide: APP_INITIALIZER,
          useFactory: coreConfigFactory,
          deps: [CoreConfig],
          multi: true
        }
      ]
    };
  }
}
