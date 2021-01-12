import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { SortPipe } from '../../../../shared/pipes/sort.pipe';
import { Pokemon } from '../../../../shared/models/pokemon';
import { PokemonAll } from '../../../../shared/models/pokemonAll';
import { PortalInjector } from '@angular/cdk/portal';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit {

  pokemons:Pokemon[] = [];
  pokemon: Pokemon;
  startIndex: number;
  finalIndex: number;

  // Flags.
  chargeData: boolean = false;

  constructor(private _pokemon: PokemonService,
              private sortPipe: SortPipe) 
  { 
    this.startIndex = 1;
    this.finalIndex = 150;
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  async getPokemon(id: number) {
    const response: PokemonAll = await this._pokemon.getPokemon(id).toPromise();
    if(response) {
      this.pokemon = new Pokemon();
      this.pokemon.name = response.name;
      this.pokemon.id = response.id;
      this.pokemon.image = response.sprites.other.dream_world.front_default;
      this.pokemon.specie = response.species.name;
      this.pokemon.stats = response.stats;
      this.pokemon.types = response.types;
      this.pokemon.abilities = response.abilities;// List.
      this.pokemon.height = response.height,
      this.pokemon.weight = response.weight
      this.pokemons.push(this.pokemon);
    }
  }

  async getPokemons(){
    for(let i = this.startIndex; i <= this.finalIndex; i++){
      await this.getPokemon(i);
    }
    this.chargeData = true;
  }


}
