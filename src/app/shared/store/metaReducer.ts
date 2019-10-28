import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { AppState } from '../../app.state';
import * as movieReducer from './movies/reducer';


export const reducers: ActionReducerMap<AppState> = {
    movies: movieReducer.reducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function(state: AppState, action: any): AppState {
        // console.log('state', state);
        // console.log('action', action);
      return reducer(state, action);
    };
  }

export const metaReducers: MetaReducer<AppState>[] = [logger];