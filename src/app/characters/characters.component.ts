import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  currentPeopleIds: any[] = [];
  uniqueSpecies = new Set();
  allSpeciesData:{} = {};
  data: any;
  movieName: string;
  allCharactersData: any;
  allPeopleIds: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<AppState>) { }

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
        this.allSpeciesData = data;
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
          this.fetchCurrentCharacterData();
        }
      }); 
  }

  fetchCurrentCharacterData(){
    if(!this.characters.length){
      return;
    }
    this.currentPeopleIds = this.characters.map(url => this.peopleDeconstructUrl(url));
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
      this.currentCharacterData = this.currentPeopleIds.map(id => this.allCharactersData[id]);
      this.constructUniqueSpeciesData();
    }
  }

  constructUniqueSpeciesData(){
    this.uniqueSpecies = new Set();
    this.currentCharacterData.forEach((item, index) => {
      item['species'].forEach(url => {
        let speciesId = this.speciesDeconstructUrl(url);
        if(!this.allSpeciesData[speciesId]){
          this.uniqueSpecies.add(speciesId);
        }
      });
      if(this.currentCharacterData.length-1 === index){
        this.getAbsentSpeciesData();
      }
    })
  }

  getAbsentSpeciesData(){
    let species_ids = Array.from(this.uniqueSpecies);
    if(species_ids.length > 0){
      this.store.dispatch(new MoviesActions.LoadSpecies({'species_id': species_ids}));
    }else{
      this.speciesDataCheck()
    }
  }

  speciesDataCheck(){
    for(let key of Array.from(this.uniqueSpecies)){
      if(!this.allSpeciesData[+key]){
        this.getAbsentSpeciesData();
      }
    }
    if(this.currentCharacterData.length > 0){
      this.constructCarouselData();
    }
  }
  constructCarouselData(){
    this.data = this.currentCharacterData.map(item => {
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

  peopleDeconstructUrl(url){
    let startIndex = url.indexOf('/people/');
    return url.slice(startIndex+8, url.length-1);
  }

  speciesDeconstructUrl(url){
    let startIndex = url.indexOf('/species/');
    return url.slice(startIndex+9, url.length-1);
  }

  back(){
    this.router.navigate(['/'])
  }
}
