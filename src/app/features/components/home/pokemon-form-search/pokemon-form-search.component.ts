import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timeStamp } from 'console';
import { Base } from '../../../../shared/interface/base';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-form-search',
  templateUrl: './pokemon-form-search.component.html',
  styleUrls: ['./pokemon-form-search.component.scss']
})
export class PokemonFormSearchComponent implements OnInit {

  flagSearch: boolean = false;
  pokemonForm: FormGroup;
  versions: Base[] = [];

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
        versions: new FormControl()
      }
    );
    this.pokemonForm.controls['versions'].setValidators([Validators.required]);
  }

  onSubmit(){
    if(this.pokemonForm.invalid){
      return;
    } else {
      this.flagSearch = true;
      console.log(this.pokemonForm.value);
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
    console.log(event.value);
  }

}
