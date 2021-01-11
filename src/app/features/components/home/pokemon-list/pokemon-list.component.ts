import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { SortPipe } from '../../../../shared/pipes/sort.pipe';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PokemonDialogBodyComponent } from '../pokemon-dialog-body/pokemon-dialog-body.component';
import { PokemonAll } from '../../../../shared/models/pokemonAll';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @Input() pokemonList;
  @Input() chargeData;


  constructor(private matDialog: MatDialog, 
    private _pokemon: PokemonService,
    private sortPipe: SortPipe) { 
  }

  ngOnInit(): void {
  }

  openDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    this._pokemon.getPokemon(id).subscribe(
      response => {
        if (response) {
          dialogConfig.width = '45rem';
          dialogConfig.data = {
            id: id.toString(),
            name: response.name,
            sprites: response.sprites,
            stats: response.stats, // List.
            types: response.types, // List.
            moves: response.moves // List.
          }
          this.matDialog.open(PokemonDialogBodyComponent, dialogConfig);
        }
      }, 
      error => {
        console.log(error);
      }
    );
  }

  orderByDesc() {
    this.pokemonList = this.sortPipe.transform(this.pokemonList, "desc", "name");
    console.log(this.pokemonList);
  }

  orderByAsc() {
    this.pokemonList = this.sortPipe.transform(this.pokemonList, "asc", "name");
    console.log(this.pokemonList);
  }

  orderById() {
    this.pokemonList = this.sortPipe.transform(this.pokemonList, "asc", "id");
    console.log(this.pokemonList);
  }

}
