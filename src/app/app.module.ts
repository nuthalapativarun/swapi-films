import { SpeciesDetailsService } from './services/species-details.service';
import { CharacterDetailsService } from './services/character-details.service';
import { FilmDetailsService } from './services/film-details.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmsComponent } from './films/films.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { CharactersComponent } from './characters/characters.component';
import { metaReducers, reducers } from './shared/store/metaReducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MoviesEffects } from './shared/store/movies/effects'


@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    CarouselComponent,
    CharactersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({maxAge: 100}),
    EffectsModule.forRoot([MoviesEffects]),
  ],
  providers: [FilmDetailsService, CharacterDetailsService, SpeciesDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
