import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { SortPipe } from '../../../../shared/pipes/sort.pipe';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PokemonDialogBodyComponent } from '../pokemon-dialog-body/pokemon-dialog-body.component';
import { PokemonAll } from '../../../../shared/models/pokemonAll';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Pokemon } from '../../../../shared/models/pokemon';
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @Input() pokemonList;
  @Input() chargeData;
  copyPokemonList: Pokemon[];
  pokemonForm: FormGroup;


  constructor(private matDialog: MatDialog, 
              private _pokemon: PokemonService,
              private sortPipe: SortPipe,
              private formBuilder: FormBuilder,
              private filterPipe: FilterPipe) { }

  ngOnInit(): void {
    this.copyPokemonList = this.pokemonList;
    this.initForm();
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
            image: response.sprites.other.dream_world.front_default,
            stats: response.stats, // List.
            types: response.types, // List.
            abilities: response.abilities, // List.
            moves: response.moves, // List.
            height: response.height,
            weight: response.weight
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

  initForm() {
    this.pokemonForm = this.formBuilder.group(
      {
        name: ['']
      }
    );
  }

  clear() {
    this.pokemonForm.reset();
  }

  onSubmit() {
    console.log(this.pokemonForm.value);

    let name: string = this.pokemonForm.value.name;

    let pokemonNameFilter = {name: name};

    if( (name && name.length > 0) ){
      this.pokemonList = this.copyPokemonList;
      this.pokemonList = this.filterPipe.transform(this.pokemonList, pokemonNameFilter);
    } else if ((name == null || name.length <= 0)) {
      this.pokemonList = this.copyPokemonList;
    } else {
      // Without filters.
      this.pokemonList = this.copyPokemonList;
    }
  }
}
