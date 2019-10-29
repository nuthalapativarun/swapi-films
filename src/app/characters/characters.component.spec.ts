import { FilmsComponent } from './../films/films.component';
import { CarouselComponent } from './../carousel/carousel.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { CharactersComponent } from './characters.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import * as fromRoot from '../shared/store/metaReducer';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersComponent, NgbCarousel, CarouselComponent, FilmsComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          {
              path:'',
              component: FilmsComponent
          }
        ]),
        StoreModule.forRoot({
          ...fromRoot.reducers
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fetchCurrentCharacterData function will return undefined', () => {
    component.characters = [];
    let returnValue = component.fetchCurrentCharacterData();
    expect(returnValue).toBeUndefined();
  });

  it('fetchCurrentCharacterData function will call constructData', () => {
    component.characters = ["https://swapi.co/api/people/1/", "https://swapi.co/api/people/2/"];
    component.allPeopleIds = ["1", "2"];
    component.allCharactersData = {
      1: {
        name: "Luke Skywalker",
        species: ["https://swapi.co/api/species/1/"]
      },
      2: {
        name: "C-3PO",
        species: ["https://swapi.co/api/species/2/"]
      }
    }
    spyOn(CharactersComponent.prototype, "constructData");
    component.fetchCurrentCharacterData();
    expect(component.constructData).toHaveBeenCalled();
  });

  it('fetchCurrentCharacterData function will dispatch LoadPeople', () => {
    component.characters = ["https://swapi.co/api/people/1/", "https://swapi.co/api/people/2/"];
    component.allCharactersData = {
      1: {
        name: "Luke Skywalker",
        species: ["https://swapi.co/api/species/1/"]
      },
      2: {
        name: "C-3PO",
        species: ["https://swapi.co/api/species/2/"]
      }
    }
    
    component.fetchCurrentCharacterData();
  });

  it('constructData function will return undefined', () => {
    let returnValue = component.constructData();
    expect(returnValue).toBeUndefined();
  });

  it('constructData function will call constructUniqueSpeciesData', () => {
    component.characters = ["https://swapi.co/api/people/1/", "https://swapi.co/api/people/2/"];
    component.allPeopleIds = ["1", "2"];
    component.currentPeopleIds = ["1", "2"];
    component.allCharactersData = {
      1: {
        name: "Luke Skywalker",
        species: ["https://swapi.co/api/species/1/"]
      },
      2: {
        name: "C-3PO",
        species: ["https://swapi.co/api/species/2/"]
      }
    }
    spyOn(CharactersComponent.prototype, "constructUniqueSpeciesData");
    component.constructData();
    expect(component.constructUniqueSpeciesData).toHaveBeenCalled();
  });

  it('constructUniqueSpeciesData function will call getAbsentSpeciesData', () => {
    component.characters = ["https://swapi.co/api/people/1/", "https://swapi.co/api/people/2/"];
    component.allPeopleIds = ["1", "2"];
    component.currentPeopleIds = ["1", "2"];
    component.allCharactersData = {
      1: {
        name: "Luke Skywalker",
        species: ["https://swapi.co/api/species/1/"]
      },
      2: {
        name: "C-3PO",
        species: ["https://swapi.co/api/species/2/"]
      }
    }
    spyOn(CharactersComponent.prototype, "getAbsentSpeciesData");
    component.constructData();
    component.constructUniqueSpeciesData();
    expect(component.getAbsentSpeciesData).toHaveBeenCalled();
  });

  it('getAbsentSpeciesData function will dispatch LoadSpecies', () => {
    component.uniqueSpecies = new Set([1,2]);
    component.getAbsentSpeciesData();
  });

  it('getAbsentSpeciesData function will call speciesDataCheck', () => {
    component.uniqueSpecies = new Set();
    spyOn(CharactersComponent.prototype, "speciesDataCheck");
    component.getAbsentSpeciesData();
    expect(component.speciesDataCheck).toHaveBeenCalled();
  });

  it('speciesDataCheck function will call getAbsentSpeciesData', () => {
    component.uniqueSpecies = new Set([1,2,3]);
    component.allSpeciesData = {
      1: {name: "Human"},
      2: {name: "Droid"}
    };
    spyOn(CharactersComponent.prototype, "getAbsentSpeciesData");
    component.speciesDataCheck();
    expect(component.getAbsentSpeciesData).toHaveBeenCalled();
  });

  it('speciesDataCheck function will call constructCarouselData', () => {
    component.uniqueSpecies = new Set([1,2]);
    component.allSpeciesData = {
      1: {name: "Human"},
      2: {name: "Droid"}
    };
    component.currentCharacterData = [
      {
        name: "Luke Skywalker",
        species: ["https://swapi.co/api/species/1/"]
      },
      {
        name: "C-3PO",
        species: ["https://swapi.co/api/species/2/"]
      }
    ];
    spyOn(CharactersComponent.prototype, "constructCarouselData");
    component.speciesDataCheck();
    expect(component.constructCarouselData).toHaveBeenCalled();
  });

  it('constructCarouselData function call will create data for carousel', () => {
    component.currentCharacterData = [
      {
        name: "Luke Skywalker",
        species: ["https://swapi.co/api/species/1/"]
      },
      {
        name: "C-3PO",
        species: ["https://swapi.co/api/species/2/"]
      }
    ];
    component.allSpeciesData = {
      1: {name: "Human"},
      2: {name: "Droid"}
    };
    component.constructCarouselData();
    expect(component.data.length).toEqual(2);
  });
});
