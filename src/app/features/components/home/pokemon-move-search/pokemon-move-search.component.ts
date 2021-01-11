import { Component, OnInit } from '@angular/core';
import { MoveAll } from '../../../../shared/models/moveAll';
import { PokemonService } from '../../../services/pokemon.service';
import { Move } from '../../../../shared/models/move';

@Component({
  selector: 'app-pokemon-move-search',
  templateUrl: './pokemon-move-search.component.html',
  styleUrls: ['./pokemon-move-search.component.scss']
})
export class PokemonMoveSearchComponent implements OnInit {

  //moves: MoveAll[] = [];
  //move: MoveAll;
  moves: Move[] = [];
  move: Move;
  startIndex: number;
  finalIndex: number;

  // Flags.
  chargeData: boolean = false;

  constructor(private _pokemon: PokemonService) { 
    this.startIndex = 1;
    this.finalIndex = 200;
  }

  ngOnInit(): void {
    this.getMoves();
    console.log(this.moves);
  }

  async getMove(id: number){
    const response: MoveAll = await this._pokemon.getMove(id).toPromise();
    if(response) {
      this.move = new Move();
      this.move.id = response.id;
      this.move.name = response.name;
      this.move.pp = response.pp;
      this.move.effect = response.effect_entries; //  List.
      this.move.priority = response.priority;
      this.move.crit_rate = response.meta.crit_rate;
      this.move.flinch_chance = response.meta.flinch_chance;
      this.move.accuracy =  response.accuracy;
      this.move.power = response.power;
      this.move.type_name = response.type.name;
      this.move.category_name = response.meta.category.name;
      this.moves.push(this.move);
    }
  }

  async getMoves() {
    for(let i = this.startIndex; i <= this.finalIndex; i++){
      await this.getMove(i);
    }
    this.chargeData = true;
  }

}
