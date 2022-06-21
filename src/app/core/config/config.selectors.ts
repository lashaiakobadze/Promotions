import { createFeatureSelector } from '@ngrx/store';

import { CoreConfigSate } from './config.reducer';

export const selectCoreConfig =
  createFeatureSelector<CoreConfigSate>('coreConfig');
