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

}
