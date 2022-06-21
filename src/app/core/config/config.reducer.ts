import { on, Action } from '@ngrx/store';
import { createImmerReducer } from '../immerNgrx';

import * as coreConfigActions from './config.actions';
import { Configuration } from './core-config.interface';

export interface CoreConfigSate {
  config: Configuration;
}

const initialState: CoreConfigSate = {
  config: <any>{}
};

const reducer = createImmerReducer(
  initialState,

  on(coreConfigActions.SetCoreConfigs, (draft, action) => {
    draft.config = action.config;
    return draft;
  })
);

export function CoreConfigReducer(state: CoreConfigSate, action: Action) {
  return reducer(state, action);
}
