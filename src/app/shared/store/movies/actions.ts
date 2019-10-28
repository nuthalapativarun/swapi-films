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

export class LoadPeople implements Action {
  readonly type = MoviesActionTypes.LoadPeople;
  constructor(public payload: {'people_id': any[]}) {}
}
export class LoadPeopleSuccess implements Action {
readonly type = MoviesActionTypes.LoadPeopleSuccess;
constructor(public payload: any) {}
}

export class LoadPeopleFailure implements Action {
readonly type = MoviesActionTypes.LoadPeopleFailure;
}

export class LoadSpecies implements Action {
  readonly type = MoviesActionTypes.LoadSpecies;
  constructor(public payload: {'species_id': any[]}) {}
}
export class LoadSpeciesSuccess implements Action {
readonly type = MoviesActionTypes.LoadSpeciesSuccess;
constructor(public payload: any) {}
}

export class LoadSpeciesFailure implements Action {
readonly type = MoviesActionTypes.LoadSpeciesFailure;
}


  export type MoviesActions = LoadFilms | LoadFilmsSuccess | LoadFilmsFailure | LoadPeople |
  LoadPeopleSuccess |  LoadPeopleFailure | LoadSpecies | LoadSpeciesSuccess | LoadSpeciesFailure;