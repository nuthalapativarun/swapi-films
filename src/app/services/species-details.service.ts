import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const speciesUrl = 'https://swapi.co/api/species/'; 
@Injectable({
  providedIn: 'root'
})
export class SpeciesDetailsService {

  constructor(private http: HttpClient) { 
  }

  getSpecies(id){
      return this.http.get(speciesUrl+id+'/');
  }
}
