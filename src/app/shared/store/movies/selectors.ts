import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './state';

export const getMoviesState = createFeatureSelector<State>('movies');

export const getFilms = createSelector(
    getMoviesState,
    (state: State) => state.films
);

export const getPeople = createSelector(
    getMoviesState,
    (state: State) => state.people
);

export const getSpecies = createSelector(
    getMoviesState,
    (state: State) => state.species
);