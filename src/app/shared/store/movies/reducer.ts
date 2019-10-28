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

      case MoviesActionTypes.LoadPeople: {
        return {
          ...state,
        }
      }

      case MoviesActionTypes.LoadPeopleSuccess: {
        return {
          ...state,
          people: {
            ...state.people,
            ...action.payload
          }
        }
      }

      case MoviesActionTypes.LoadPeopleFailure: {
        return {
          ...state,
          people: null
        }
      }

      case MoviesActionTypes.LoadSpecies: {
        return {
          ...state,
        }
      }

      case MoviesActionTypes.LoadSpeciesSuccess: {
        return {
          ...state,
          species: {
            ...state.species,
            ...action.payload
          }
        }
      }

      case MoviesActionTypes.LoadSpeciesFailure: {
        return {
          ...state,
          species: null
        }
      }

      default: {
        return state ;
      }
      
    }
  }