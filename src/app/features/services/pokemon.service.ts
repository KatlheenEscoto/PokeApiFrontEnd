import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PokemonAll } from '../../shared/models/pokemonAll';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getPokemons() {
    return this.http.get<any>(`${this.baseUrl}/pokemon`);
  }

  getPokemon(index: number): Observable<PokemonAll> {
    return this.http.get<PokemonAll>(`${this.baseUrl}/pokemon/${index}`);
  }

}
