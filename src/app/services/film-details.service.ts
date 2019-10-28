import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const filmsUrl = 'https://swapi.co/api/films/';

@Injectable({
  providedIn: 'root'
})

export class FilmDetailsService {

  constructor(private http: HttpClient) { 
  }

  get(){
    return this.http.get(filmsUrl);
  }
}
