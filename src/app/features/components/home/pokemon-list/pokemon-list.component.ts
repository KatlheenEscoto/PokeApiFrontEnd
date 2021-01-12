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

  @Input() pokemonList: Pokemon[];
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
    this.pokemonList = this.copyPokemonList;
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
    console.log(this.pokemonForm.value);

    let name: string = this.pokemonForm.value.name;
    let ability: string = this.pokemonForm.value.ability_name;
    let types = this.pokemonForm.value.types;
    let type1: string;
    let type2: string;
    if(types != null) {
      type1 = this.pokemonForm.value.types[0];
      type2 = this.pokemonForm.value.types[1];
    }

    let pokemonNameFilter = {name: name};

    if ((name && name.length > 0) && 
        (ability && name.length > 0) &&
        (types != null) &&
        (type1 && type1.length > 0) &&
        (type2 && type2.length > 0))
    {
      // Filter by: name, ability, type1, type2.
      console.log('name, ability, type1, type2');

      this.pokemonList = this.copyPokemonList;
      this.pokemonList = this.filterPipe.transform(this.pokemonList, pokemonNameFilter);
      this.pokemonList = this.filterByAbilities(this.pokemonList, ability);
      this.pokemonList = this.filterByTypes(this.pokemonList, type1);
      this.pokemonList = this.filterByTypes(this.pokemonList, type2);

    }
    
    else if ((name && name.length > 0) && 
            (ability && name.length > 0) &&
            (types != null) &&
            (types.length == 1) &&
            (type1 && type1.length > 0) &&
            (type2 == null))
    {
      // Filter by: name, ability, one type.
      console.log('name, ability, one type.');

      this.pokemonList = this.copyPokemonList;
      this.pokemonList = this.filterPipe.transform(this.pokemonList, pokemonNameFilter);
      this.pokemonList = this.filterByAbilities(this.pokemonList, ability);
      this.pokemonList = this.filterByTypes(this.pokemonList, type1);

    } 

    else if((name == null || name.length <= 0) &&
            (ability && ability.length > 0) &&
            (types != null) &&
            (type1 && type1.length > 0) &&
            (type2 && type2.length > 0)) {
      // Filter by: ability, type1, type2.
      console.log('Filter by: ability, type1, type2.');
      this.pokemonList = this.copyPokemonList;
      this.pokemonList = this.filterByAbilities(this.pokemonList, ability);
      this.pokemonList = this.filterByTypes(this.pokemonList, type1);
      this.pokemonList = this.filterByTypes(this.pokemonList, type2); 
    }

    else if ((name && name.length > 0) && 
            (ability && name.length > 0) &&
            (types == null))
    {
    // Filter by: name and ability.
    console.log('name and ability');

    this.pokemonList = this.copyPokemonList;
    this.pokemonList = this.filterPipe.transform(this.pokemonList, pokemonNameFilter);
    this.pokemonList = this.filterByAbilities(this.pokemonList, ability);

    }

    else if ((name && name.length > 0) && 
            (ability == null || ability.length <= 0) && 
            (types != null) &&
            (types.length == 1) &&
            (type1 && type1.length > 0) &&
            (type2 == null))
    {
    // Filter by: name and type.
    console.log('name and type');

    this.pokemonList = this.copyPokemonList;
    this.pokemonList = this.filterPipe.transform(this.pokemonList, pokemonNameFilter);
    this.pokemonList = this.filterByTypes(this.pokemonList, type1);



    }
    
    else if ((name == null || name.length <= 0) && 
            (ability && ability.length > 0) &&
            (types != null) &&
            (types.length <= 1) &&
            (type1 && type1.length > 0) &&
            (type2 == null))
    {
      // Filter by: ability and type.
      console.log('ability and type');
      this.pokemonList = this.copyPokemonList;
      this.pokemonList = this.filterByAbilities(this.pokemonList, ability);
      this.pokemonList = this.filterByTypes(this.pokemonList, type1);
    }

    else if((name == null || name.length <= 0) &&
            (ability == null || ability.length <= 0) && 
            (types != null) &&
            (type1 && type1.length > 0) &&
            (type2 && type2.length > 0)) {
      // Filter by: type1, type2.
      console.log('Filter by: type1, type2.');
      this.pokemonList = this.copyPokemonList;
      this.pokemonList = this.filterByTypes(this.pokemonList, type1);
      this.pokemonList = this.filterByTypes(this.pokemonList, type2); 
    }
    else if((name == null || name.length <= 0) && 
            (ability == null || ability.length <= 0) && 
            (types == null))
    {
      // Without filters.
      console.log('No filter - null');
      this.pokemonList = this.copyPokemonList;
    } 
    else {
      // Without filters.
      console.log('-');
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

  filterByAbilities(pokemons, ability) {

    let pokemonListByAbilities = [];
    for(let pokemon of pokemons) {
      for(let pokemon_ability of pokemon.abilities) {
        if(pokemon_ability.ability.name.toString().toLocaleLowerCase().includes(ability.toString().toLocaleLowerCase())){
          pokemonListByAbilities.push(pokemon);
        }
      }
    }
    return pokemonListByAbilities;
  }

  filterByTypes(pokemons, type) {

    let pokemonListByTypes = [];
    for(let pokemon of pokemons) {
      for(let pokemon_type of pokemon.types) {
        if(pokemon_type.type.name.toString().toLocaleLowerCase().includes(type.toString().toLocaleLowerCase())){
          pokemonListByTypes.push(pokemon);
        }
      }
    }
    return pokemonListByTypes;
  }


}
