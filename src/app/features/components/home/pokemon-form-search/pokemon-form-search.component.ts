import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Base } from '../../../../shared/interface/base';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-form-search',
  templateUrl: './pokemon-form-search.component.html',
  styleUrls: ['./pokemon-form-search.component.scss']
})
export class PokemonFormSearchComponent implements OnInit {

  startIndex: number = 1;
  finalIndex: number = 150;  
  flagSearch: boolean = false;
  pokemonForm: FormGroup;
  versions: Base[] = [];
  namePokedex: string;

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor(private formBuilder: FormBuilder,
              private _pokemon: PokemonService) { }

  ngOnInit(): void {
    this.getData();
    this.initForm();
  }

  initForm() {
    this.pokemonForm = this.formBuilder.group(
      {
        versions: new FormControl(),
        generation: ['']
      }
    );
    this.pokemonForm.controls['versions'].setValidators([Validators.required]);
    this.pokemonForm.controls['generation'].setValidators([Validators.required]);
  }

  onSubmit(){
    if(this.pokemonForm.invalid) {
      return;
    } else {
      console.log(this.pokemonForm.value.versions);
      this._pokemon.getUrl(this.pokemonForm.value.versions.url).toPromise().then(
        response => {
          this.namePokedex = response.pokedexes[0].name;
          this._pokemon.getUrl(response.pokedexes[0].url).toPromise().then(
            resp => {
                let start = resp.pokemon_entries[0].pokemon_species.url.split('/')[6];
                let final = resp.pokemon_entries[resp.pokemon_entries.length-1].pokemon_species.url.split('/')[6];
                console.log(`Start: ${start}, Final: ${final}`);
                if(start < final){
                  this.startIndex = start;
                  this.finalIndex = final;
                } else {
                  this.startIndex = final;
                  this.finalIndex = start;
                }
                this.flagSearch = true;
              
            }
          );
        }
      );
    }
  }

  async getData() {
    // Versions.
    const response = await this._pokemon.getVersions().toPromise();
    if(response) {
      this.versions = response.results;
    }

  }

  onChange(event){
    this._pokemon.getUrl(event.value.url).toPromise().then(
      response => {
        this.pokemonForm.controls['generation'].setValue(response.generation.name);
      }
    );
  }

}
