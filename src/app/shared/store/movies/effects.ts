import { SpeciesDetailsService } from './../../../services/species-details.service';
import { CharacterDetailsService } from './../../../services/character-details.service';
import { FilmDetailsService } from './../../../services/film-details.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as  MoviesActions from './actions';
import { MoviesActionTypes } from './types';
// import { Company, Species } from './models';
import { AppState } from '../../../app.state';

import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, forkJoin } from 'rxjs';
import { concatAll, catchError, map, switchMap, tap, takeLast, startWith, exhaustMap, withLatestFrom } from 'rxjs/operators';


@Injectable()
export class MoviesEffects {
    constructor(private actions: Actions, private store: Store<AppState>, private filmDetailsService: FilmDetailsService,
                private characterDetailsService: CharacterDetailsService, private speciesDetailsService: SpeciesDetailsService){}


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

    @Effect()
    loadPeople = this.actions.pipe(
        ofType<MoviesActions.LoadPeople>(MoviesActionTypes.LoadPeople),
        map(action => action.payload),
        exhaustMap((payload) => {

            return <Observable<any>> forkJoin(
                payload.people_id.map(ids => <Observable<any>> this.characterDetailsService.getCharacter(ids))
              ).pipe(map(successData => {
                  let ids = payload.people_id;
                  let data = {}
                  successData.forEach((item, index) => {
                      data[ids[index]] = {
                          name: item.name,
                          species: item.species
                      }
                  });
                return new MoviesActions.LoadPeopleSuccess(data)
              }));
        })
    )

    @Effect()
    loadSpecies = this.actions.pipe(
        ofType<MoviesActions.LoadSpecies>(MoviesActionTypes.LoadSpecies),
        map(action => action.payload),
        exhaustMap((payload) => {//debugger

            return <Observable<any>> forkJoin(
                payload.species_id.map(ids => <Observable<any>> this.speciesDetailsService.getSpecies(ids))
              ).pipe(map(successData => {//debugger
                  let ids = payload.species_id;
                  let data = {}
                  successData.forEach((item, index) => {
                      data[ids[index]] = {
                          name: item.name
                      }
                  });
                return new MoviesActions.LoadSpeciesSuccess(data)
              }));
        })
    )
}