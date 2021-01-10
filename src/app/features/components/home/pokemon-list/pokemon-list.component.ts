import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { SortPipe } from '../../../../shared/pipes/sort.pipe';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @Input() pokemonList;

  constructor(private sortPipe: SortPipe) { }

  ngOnInit(): void {

    const sortedArr = this.sortPipe.transform(this.pokemonList, "desc", "name");

  }
}
