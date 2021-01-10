import { Component, OnInit } from '@angular/core';
import { ItemAll } from '../../../../shared/models/itemAll';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-item-search',
  templateUrl: './pokemon-item-search.component.html',
  styleUrls: ['./pokemon-item-search.component.scss']
})
export class PokemonItemSearchComponent implements OnInit {

  items: ItemAll[] = [];
  item: ItemAll;
  startIndex: number;
  finalIndex: number;

  // Flags.
  chargeData: boolean = false;

  constructor(private _pokemon: PokemonService) { 
    this.startIndex = 1;
    this.finalIndex = 200;
  }

  ngOnInit(): void {
    this.getItems();
    console.log(this.items);
  }

  async getItem(id: number){
    const response: ItemAll = await this._pokemon.getItem(id).toPromise();
    if(response) {
      this.item = response;
      this.items.push(this.item);
    }
  }

  async getItems() {
    for(let i = this.startIndex; i <= this.finalIndex; i++){
      await this.getItem(i);
    }
    this.chargeData = true;
  }

}
