import * as moviesState from './shared/store/movies/state';

export interface AppState {
    movies: moviesState.State;
}