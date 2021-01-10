import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/shared/models/pokemon';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getPokemons() {
    return this.http.get<any>(`${this.baseUrl}/pokemon`);
  }

  getPokemon(index: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${index}`);
  }

}
