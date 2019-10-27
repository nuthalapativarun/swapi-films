import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const filmsUrl = 'https://swapi.co/api/films/';

@Injectable({
  providedIn: 'root'
})


export class FilmDetailsService {
  filmsData:any;
  filmsChanged = new Subject();
  constructor(private http: HttpClient) { 
  }

  getFilms(){
      this.http.get(filmsUrl).subscribe(data => {
        this.filmsData = data['results'];
        this.filmsChanged.next(this.filmsData);
      });
  }
}
