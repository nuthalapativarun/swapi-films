import { CharactersComponent } from './characters/characters.component';
import { FilmsComponent } from './films/films.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'movies',
    component: FilmsComponent
  },
  {
    path: 'characters/:id',
    component: CharactersComponent
  },
  { 
    path: '**', 
    redirectTo: 'movies', 
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
