import produce from 'immer';
import {
  Action,
  ReducerTypes,
  ActionReducer,
  createReducer
} from '@ngrx/store';

export function immerReducer<State, Next>(
  callback: (state: State, next: Next) => State | void
) {
  return (state: State | undefined, next: Next) =>
    produce(state, (draft: State) => callback(draft, next)) as State;
}

export function createImmerReducer<State, A extends Action = Action>(
  initialState: State,
  ...ons: ReducerTypes<State, any>[]
): ActionReducer<State, A> {
  const reducer = createReducer(initialState, ...ons);
  return function reduce(state: State = initialState, action: A) {
    return immerReducer<State, A>(reducer)(state, action);
  };
}
