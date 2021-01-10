import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../../../shared/models/pokemon';
import { SortPipe } from '../../../../shared/pipes/sort.pipe';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons:Pokemon[] = [];
  pokemon: Pokemon;
  startIndex: number;
  finalIndex: number;


  constructor(private _pokemon: PokemonService,
              private sortPipe: SortPipe) 
  { 
    this.startIndex = 1;
    this.finalIndex = 150;
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  async getPokemon(index: number) {
    this.pokemon = await this._pokemon.getPokemon(index).toPromise();
    if(this.pokemon){
      this.pokemons.push(this.pokemon);
    }
  }

  async getPokemons(){
    for(let i = 1; i <= 150; i++){
      await this.getPokemon(i);
    }
  }



}
