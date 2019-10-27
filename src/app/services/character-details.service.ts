import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const characterUrl = 'https://swapi.co/api/people/'; 

@Injectable({
  providedIn: 'root'
})
export class CharacterDetailsService {
  
  constructor(private http: HttpClient) { 
  }

  getCharacter(id){
      return this.http.get(characterUrl+id+'/');
  }
}
