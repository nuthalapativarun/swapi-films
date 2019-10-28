import * as MoviesActions from './../shared/store/movies/actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import * as MoviesSelectors from './../shared/store/movies/selectors';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {
  filmsData:any = [];
  constructor(private store: Store<AppState>) { }

  ngOnInit() {    
    this.store.select(MoviesSelectors.getFilms).subscribe(data => {
      if (data) {
        this.filmsData = data;
      }else{
        this.store.dispatch(new MoviesActions.LoadFilms());
      }
    });
  }

}
