import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './state';

export const getMoviesState = createFeatureSelector<State>('movies');

export const getFilms = createSelector(
    getMoviesState,
    (state: State) => state.films
);