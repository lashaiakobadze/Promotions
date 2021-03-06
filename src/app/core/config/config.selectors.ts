import { createFeatureSelector } from '@ngrx/store';

import { CoreConfigSate } from './config.reducer';

/**
 * Used to with other selectors.
 */
export const selectCoreConfig =
  createFeatureSelector<CoreConfigSate>('coreConfig');
