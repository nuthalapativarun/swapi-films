import { FilmDetailsService } from './../services/film-details.service';
import { Component, OnInit } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {
  filmsData:any = [];
  constructor(private filmDetailService: FilmDetailsService) { }

  ngOnInit() {
    this.getFilms();
    this.filmDetailService.filmsChanged.subscribe(data => {
      this.filmsData = data;
    });
  }

  getFilms(){
    this.filmDetailService.getFilms();
  }
  previous(){
    
    console.log("clickedx prev");
  }

  next(){
    console.log("next prev");
  }
}
