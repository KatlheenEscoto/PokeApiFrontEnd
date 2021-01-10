import { Component, OnInit } from '@angular/core';
import { MoveAll } from '../../../../shared/models/moveAll';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-move-search',
  templateUrl: './pokemon-move-search.component.html',
  styleUrls: ['./pokemon-move-search.component.scss']
})
export class PokemonMoveSearchComponent implements OnInit {

  moves: MoveAll[] = [];
  move: MoveAll;
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
      this.move = response;
      console.log(this.move)
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
