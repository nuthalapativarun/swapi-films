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


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  id: any;
  characters: [] = [];
  filmsData: any;
  characterData:any = [];
  uniqueSpecies = new Set();
  allSpeciesData:{} = {};
  data: any;

  constructor(private router: Router, private route: ActivatedRoute, private filmDetailService: FilmDetailsService, 
    private characterDetailsService: CharacterDetailsService, private speciesDetailsService: SpeciesDetailsService, 
    private httpClient: HttpClient, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(MoviesSelectors.getFilms).subscribe(data => {
      if (data) {
        this.filmsData = data;
      }else{
        this.back();
      }
    });
    
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if(!this.filmsData || this.id >= this.filmsData.length){
          this.back();
        }else{
          this.characters = this.filmsData[this.id]['characters'];
          this.construct();
          
        }
      }
    );
  }

  construct(){
    let peoples_id = this.characters.map(url => this.deconstructUrl(url));

    let characterSubscription = this.getCharacters(peoples_id);
    characterSubscription.subscribe(data => {
      this.characterData.push(data);

      if(data && data['species']){
        data['species'].forEach(url => {
          let speciesId = this.speciesDeconstructUrl(url);
          if(!this.allSpeciesData[speciesId]){
            this.uniqueSpecies.add(speciesId);
          }
        })
      }
      if(this.characterData.length === peoples_id.length){
        this.getSpeciesData();
      }
    });



    // peoples_id.forEach((id, index) => {
    //   this.characterDetailsService.getCharacter(id).subscribe(data => {
    //     this.characterData.push(data);
    //     if(data && data['species']){
    //       data['species'].forEach(url => {
    //         let speciesId = this.speciesDeconstructUrl(url);
            
    //         if(!this.allSpeciesData[speciesId]){
    //           this.uniqueSpecies.add(speciesId);
    //         }
    //         //Commented this becuase construcCarouselData is getting called and data not present for all species
    //         // if(!this.speciesData[speciesId]){
    //         //   this.speciesData[speciesId] = {};
    //         //   this.getSpeciesData(speciesId);
    //         // }
    //       })
    //     }
    //     if(index === peoples_id.length-1){
    //       this.getSpeciesData();
    //     }
    //     console.log("characterdata", this.characterData);
    //     console.log("uniqueSpecies", this.uniqueSpecies);
    //   })
    // });
  }

  deconstructUrl(url){
    let startIndex = url.indexOf('/people/');
    return url.slice(startIndex+8, url.length-1);
  }

  speciesDeconstructUrl(url){
    let startIndex = url.indexOf('/species/');
    return url.slice(startIndex+9, url.length-1);
  }
  
  construcCarouselData(){
    this.data = this.characterData.map(item => {
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
  getSpeciesData(){
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

  getItems(ids): Observable<any> {
    return <Observable<any>> forkJoin(
      ids.map(id => <Observable<any>> this.speciesDetailsService.getSpecies(id))
    ).pipe(concatAll());
  }


  getCharacters(ids): Observable<any> {
    return <Observable<any>> forkJoin(
      ids.map(id => <Observable<any>> this.characterDetailsService.getCharacter(id))
    ).pipe(concatAll());
  }

  back(){
    this.router.navigate(['/'])
  }
}
