import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoveAll } from 'src/app/shared/models/moveAll';
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

  getPokemon(id: number): Observable<PokemonAll> {
    return this.http.get<PokemonAll>(`${this.baseUrl}/pokemon/${id}`);
  }

  getMoves() {
    return this.http.get<any>(`${this.baseUrl}/move`);
  }

  getMove(id: number): Observable<MoveAll> {
    return this.http.get<MoveAll>(`${this.baseUrl}/move/${id}`);
  }

  getItems() {
    return this.http.get<any>(`${this.baseUrl}/item`);
  }

  getItem(id: number) {
    return this.http.get<any>(`${this.baseUrl}/item/${id}`);
  }

  getTypes() {
    return this.http.get<any>(`${this.baseUrl}/type`);
  }

  getCategories() {
    return this.http.get<any>(`${this.baseUrl}/move-category`);
  }

  getAbilities() {
    return this.http.get<any>(`${this.baseUrl}/ability/?offset=0&limit=20`);
  }

  getVersions() {
    return this.http.get<any>(`${this.baseUrl}/version-group`);
  }

}
