import { State } from './state';
import { MoviesActions } from './actions';
import { MoviesActionTypes } from './types';

export const initialState: State = {
    films: null,
    people: null,
    species: null
  };


  export function reducer(state = initialState, action: MoviesActions): State {
    switch (action.type) {
      case MoviesActionTypes.LoadFilms: {
        return {
          ...state,
        }
      }

      case MoviesActionTypes.LoadFilmsSuccess: {
        return {
          ...state,
          films: action.payload
        }
      }

      case MoviesActionTypes.LoadFilmsFailure: {
        return {
          ...state,
          films: null
        }
      }

      default: {
        return state ;
      }
      
    }
  }