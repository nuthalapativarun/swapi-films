import { SpeciesDetailsService } from './../../../services/species-details.service';
import { CharacterDetailsService } from './../../../services/character-details.service';
import { FilmDetailsService } from './../../../services/film-details.service';
import { Injectable } from '@angular/core';
import * as  MoviesActions from './actions';
import { MoviesActionTypes } from './types';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, forkJoin } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';


@Injectable()
export class MoviesEffects {
    constructor(private actions: Actions, private filmDetailsService: FilmDetailsService,
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
        exhaustMap((payload) => {
            return <Observable<any>> forkJoin(
                payload.species_id.map(ids => <Observable<any>> this.speciesDetailsService.getSpecies(ids))
              ).pipe(map(successData => {
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