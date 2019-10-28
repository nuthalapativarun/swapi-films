import { HttpClient } from '@angular/common/http';
import { SpeciesDetailsService } from './../services/species-details.service';
import { CharacterDetailsService } from './../services/character-details.service';
import { FilmDetailsService } from './../services/film-details.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, from, forkJoin} from 'rxjs';
import { concatAll, switchMap, mergeMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import * as MoviesSelectors from './../shared/store/movies/selectors';
import * as MoviesActions from './../shared/store/movies/actions'


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  id: any;
  characters: [] = [];
  filmsData: any;
  currentCharacterData:any = [];
  currentReduxCharacterData:any = [];
  currentPeopleIds: any[] = [];
  uniqueSpecies = new Set();
  currentuniqueSpecies = new Set();
  allSpeciesData:{} = {};
  reduxAllSpeciesData:{} = {};
  data: any;
  movieName: string;
  allCharactersData: any;
  allPeopleIds: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private characterDetailsService: CharacterDetailsService, 
    private speciesDetailsService: SpeciesDetailsService, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(MoviesSelectors.getFilms).subscribe(data => {
      if (data) {
        this.filmsData = data;
      }else{
        this.back();
      }
    });

    this.store.select(MoviesSelectors.getSpecies).subscribe(data => {
      if (data) {
        this.reduxAllSpeciesData = data;
        this.speciesDataCheck();
      }
    });
    

    this.store.select(MoviesSelectors.getPeople).subscribe(data => {
      if(data){
        this.allCharactersData = data;
        this.allPeopleIds = Object.keys(data);
        this.constructData();
      }
      
    });

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if(!this.filmsData || this.id >= this.filmsData.length || this.id < 0){
          this.back();
        }else{
          this.characters = this.filmsData[this.id]['characters'];
          this.movieName = this.filmsData[this.id]['title'];
          // this.construct(); //http
          this.fetchCurrentCharacterData();
        }
      }); 
  }

  fetchCurrentCharacterData(){
    if(!this.characters.length){
      return;
    }
    this.currentPeopleIds = this.characters.map(url => this.deconstructUrl(url));
    let newPeopleIds = [];
    if(this.allPeopleIds && this.allPeopleIds.length > 0){ 
      newPeopleIds = this.currentPeopleIds.filter(id => !this.allPeopleIds.includes(id));
    }else{
      newPeopleIds = this.currentPeopleIds;
    }
    if(newPeopleIds && newPeopleIds.length > 0){
      this.store.dispatch(new MoviesActions.LoadPeople({'people_id': newPeopleIds}));
    }else{
      this.constructData();
    }
  }

  constructData(){
    if(!this.currentPeopleIds.length){
      return;
    }
    let peopleIds = this.currentPeopleIds.filter(id => this.allPeopleIds.includes(id));
    if(peopleIds.length === this.currentPeopleIds.length){
      this.currentReduxCharacterData = this.currentPeopleIds.map(id => this.allCharactersData[id]);
      this.constructUniqueSpeciesData();
    }
  }

  constructUniqueSpeciesData(){
    this.currentuniqueSpecies = new Set();
    this.currentReduxCharacterData.forEach((item, index) => {
      item['species'].forEach(url => {
        let speciesId = this.speciesDeconstructUrl(url);
        if(!this.reduxAllSpeciesData[speciesId]){
          this.currentuniqueSpecies.add(speciesId);
        }
      });
      if(this.currentReduxCharacterData.length-1 === index){
        this.getAbsentSpeciesData();
      }
    })
  }

  getAbsentSpeciesData(){
    let species_ids = Array.from(this.currentuniqueSpecies);
    if(species_ids.length > 0){
      this.store.dispatch(new MoviesActions.LoadSpecies({'species_id': species_ids}));
    }else{
      this.speciesDataCheck()
    }
  }

  speciesDataCheck(){
    for(let key of Array.from(this.currentuniqueSpecies)){
      if(!this.reduxAllSpeciesData[+key]){
        this.getAbsentSpeciesData();
      }
    }
    if(this.currentReduxCharacterData.length > 0){
      this.ccd();
    }
  }
  ccd(){
    this.data = this.currentReduxCharacterData.map(item => {
      let speciesNames = item.species.map(url => {
        let specieId = this.speciesDeconstructUrl(url);
        return this.reduxAllSpeciesData[specieId]['name'];
      });
      
      return {
        title: item.name,
        secondaryData: speciesNames
        };
    });
  }

  deconstructUrl(url){
    let startIndex = url.indexOf('/people/');
    return url.slice(startIndex+8, url.length-1);
  }

  speciesDeconstructUrl(url){
    let startIndex = url.indexOf('/species/');
    return url.slice(startIndex+9, url.length-1);
  }

  construct(){//Http
    let peoples_id = this.characters.map(url => this.deconstructUrl(url));
    let characterSubscription = this.getCharacters(peoples_id);
    characterSubscription.subscribe(data => {
      this.currentCharacterData.push(data);

      if(data && data['species']){
        data['species'].forEach(url => {
          let speciesId = this.speciesDeconstructUrl(url);
          if(!this.allSpeciesData[speciesId]){
            this.uniqueSpecies.add(speciesId);
          }
        })
      }
      if(this.currentCharacterData.length === peoples_id.length){
        this.getSpeciesData();
      }
    });
  }

  construcCarouselData(){//Http
    let data = this.currentCharacterData.map(item => {
      let speciesNames = item.species.map(url => {
        let specieId = this.speciesDeconstructUrl(url);
        return this.allSpeciesData[specieId]['name'];
      });
      
      return {
        title: item.name,
        secondaryData: speciesNames
        };
    });
  }
  getSpeciesData(){//Http
    let speciesIds = Array.from(this.uniqueSpecies);
    let speciesData = [];
    let speciesSubscription = this.getItems(speciesIds); 
    speciesSubscription.subscribe(data => {
      speciesData.push(data);
      if(speciesData.length === speciesIds.length){
        speciesIds.forEach((ids, index) => {
          this.allSpeciesData[+ids] = speciesData[index];
          if(index === speciesIds.length-1){
            this.construcCarouselData();
          }
        });
      }
    });
  }

  getItems(ids): Observable<any> {//Http
    return <Observable<any>> forkJoin(
      ids.map(id => <Observable<any>> this.speciesDetailsService.getSpecies(id))
    ).pipe(concatAll());
  }


  getCharacters(ids): Observable<any> {//Http
    return <Observable<any>> forkJoin(
      ids.map(id => <Observable<any>> this.characterDetailsService.getCharacter(id))
    ).pipe(concatAll());
  }

  back(){
    this.router.navigate(['/'])
  }
}
