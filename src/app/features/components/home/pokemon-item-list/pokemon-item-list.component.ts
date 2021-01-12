import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PokemonService } from '../../../services/pokemon.service';
import { SortPipe } from '../../../../shared/pipes/sort.pipe';
import { PokemonItemDialogBodyComponent } from '../pokemon-item-dialog-body/pokemon-item-dialog-body.component';
import { ItemAll } from '../../../../shared/models/itemAll';
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';

@Component({
  selector: 'app-pokemon-item-list',
  templateUrl: './pokemon-item-list.component.html',
  styleUrls: ['./pokemon-item-list.component.scss']
})
export class PokemonItemListComponent implements OnInit {

  @Input() itemList;
  @Input() chargeData;
  copyItemList: ItemAll[];
  name: string = '';

  constructor(private matDialog: MatDialog, 
              private _pokemon: PokemonService,
              private sortPipe: SortPipe,
              private filterPipe: FilterPipe) { 
  }

  ngOnInit(): void {
    this.copyItemList = this.itemList;
  }

  openDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    this._pokemon.getItem(id).subscribe(
      response => {
        if (response) {
          dialogConfig.width = '40rem';
          dialogConfig.data = {
            id: id.toString(),
            name: response.name,
            effect: response.effect_entries, // List.
            attributes: response.attributes, // List.
            category: response.category.name,
            cost: response.cost
          }
          this.matDialog.open(PokemonItemDialogBodyComponent, dialogConfig);
        }
      }, 
      error => {
        console.log(error);
      }
    );
  }

  orderByDesc() {
    this.itemList = this.sortPipe.transform(this.itemList, "desc", "name");
    console.log(this.itemList);
  }

  orderByAsc() {
    this.itemList = this.sortPipe.transform(this.itemList, "asc", "name");
    console.log(this.itemList);
  }

  filter(value) {
    let itemFilter = {};
    if(value.name && value.name.length > 0 ){
      itemFilter = {name: value.name};
      console.log(itemFilter);
      this.itemList = this.filterPipe.transform(this.itemList, itemFilter);
    } else if(value.name == null){
      this.itemList = this.copyItemList;
    } else {
      this.itemList = this.copyItemList;
    }  
  }

  clear() {
    this.name = '';
  }

  originalList() {
    this.itemList = this.copyItemList;
  }

}
