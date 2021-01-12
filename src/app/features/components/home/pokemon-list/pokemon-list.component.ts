import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { SortPipe } from '../../../../shared/pipes/sort.pipe';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PokemonDialogBodyComponent } from '../pokemon-dialog-body/pokemon-dialog-body.component';
import { PokemonAll } from '../../../../shared/models/pokemonAll';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Pokemon, Type } from '../../../../shared/models/pokemon';
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  typesPokemon = [];


  constructor(private matDialog: MatDialog, 
              private _pokemon: PokemonService,
              private sortPipe: SortPipe,
              private formBuilder: FormBuilder,
              private filterPipe: FilterPipe) { }

  ngOnInit(): void {
    this.copyPokemonList = this.pokemonList;
    this.initForm();
    this.getData();
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
        name: [''],
        types: new FormControl([]),
        ability_name: ['']
      }
    );
  }

  clear() {
    this.pokemonForm.reset();
  }

  onSubmit() {
    console.log(this.pokemonForm.value.types);

    let name: string = this.pokemonForm.value.name;

    let pokemonNameFilter = {name: name};

    if( (name && name.length > 0) ){
      // Find By Name.
      this.pokemonList = this.copyPokemonList;
      this.pokemonList = this.filterPipe.transform(this.pokemonList, pokemonNameFilter);
    } else if ((name == null || name.length <= 0)) {
      this.pokemonList = this.copyPokemonList;
    } else {
      // Without filters.
      this.pokemonList = this.copyPokemonList;
    }
  }

  async getData() {

    // Abilities.
    const response = await this._pokemon.getAbilities().toPromise();
    if(response) {
      let abilities = response.results;
      for(let ability of abilities) {
        this.options.push(ability.name);
      }
      this.filteredOptions = this.pokemonForm.controls['ability_name'].valueChanges.pipe(
        startWith(""), 
        map(val => this.filterType(val))
      );
    }

    // Types.
    const responseTypes = await this._pokemon.getTypes().toPromise();
    if(responseTypes) {
      let types = responseTypes.results;
      for(let type of types) {
        this.typesPokemon.push(type.name);
      }
    }
  }

  filterType(val: string): string[] {
    return this.options.filter(option => {
      return option.toLowerCase().match(val.toLowerCase());
    });
  }

  getTypes(): FormArray {
    return this.pokemonForm.get('types') as FormArray;
  }

}
