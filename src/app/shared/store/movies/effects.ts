import { FilmDetailsService } from './../../../services/film-details.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as  MoviesActions from './actions';
import { MoviesActionTypes } from './types';
// import { Company } from './models';
import { AppState } from '../../../app.state';

import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, takeLast, startWith, exhaustMap, withLatestFrom } from 'rxjs/operators';
import { Action } from '@ngrx/store';

@Injectable()
export class MoviesEffects {
    constructor(private actions: Actions, private store: Store<AppState>, private filmDetailsService: FilmDetailsService){}


    @Effect()
    loadFilms = this.actions.pipe(
        ofType<MoviesActions.LoadFilms>(MoviesActionTypes.LoadFilms),
        map(action => action),
        exhaustMap(() => {
            return this.filmDetailsService.get().pipe(
                map(successData => {
                    let filmsData = successData['results'].map(item => {
                                        return {title: item.title,
                                                characters: item.characters
                                            }
                                    });
                    return new MoviesActions.LoadFilmsSuccess(filmsData)
                })
            )
        })
    )
}