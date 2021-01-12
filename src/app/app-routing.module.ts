import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonSearchComponent } from './features/components/home/pokemon-search/pokemon-search.component';
import { PokemonMoveSearchComponent } from './features/components/home/pokemon-move-search/pokemon-move-search.component';
import { PokemonItemSearchComponent } from './features/components/home/pokemon-item-search/pokemon-item-search.component';

const routes: Routes = [
  {
    path: 'home',
    component: PokemonSearchComponent
  },
  {
    path: 'moves',
    component: PokemonMoveSearchComponent
  },
  {
    path: 'items',
    component: PokemonItemSearchComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
