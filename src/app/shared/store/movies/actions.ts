import { Action } from '@ngrx/store';
import { MoviesActionTypes } from './types';
import {Films, People, Species} from './models';


export class LoadFilms implements Action {
    readonly type = MoviesActionTypes.LoadFilms;
  }
  export class LoadFilmsSuccess implements Action {
    readonly type = MoviesActionTypes.LoadFilmsSuccess;
    constructor(public payload: any) {}
  }
  
  export class LoadFilmsFailure implements Action {
    readonly type = MoviesActionTypes.LoadFilmsFailure;
  }


  export type MoviesActions = LoadFilms | LoadFilmsSuccess | LoadFilmsFailure;