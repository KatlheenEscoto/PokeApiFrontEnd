import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PokemonDialogBodyComponent } from '../pokemon-dialog-body/pokemon-dialog-body.component';
import { PokemonMoveDialogBodyComponent } from '../pokemon-move-dialog-body/pokemon-move-dialog-body.component';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-move-list',
  templateUrl: './pokemon-move-list.component.html',
  styleUrls: ['./pokemon-move-list.component.scss']
})
export class PokemonMoveListComponent implements OnInit {

  @Input() moveList;
  numbers: number[] = [];

  constructor(private matDialog: MatDialog, 
              private _pokemon: PokemonService) { 
  }

  ngOnInit(): void {
    for (let index = 0; index < this.moveList; index++) {
      this.numbers.push(index);
    }
  }

  openDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    this._pokemon.getMove(id).subscribe(
      response => {
        if (response) {
          dialogConfig.width = '40rem';
          dialogConfig.data = {
            id: id.toString(),
            name: response.name,
            pp: response.pp,
            effect: response.effect_entries, //  List.
            priority: response.priority,
            crit_rate: response.meta.crit_rate,
            flinch_chance: response.meta.flinch_chance,
            accuracy: response.accuracy,
            power: response.power
          }
          this.matDialog.open(PokemonMoveDialogBodyComponent, dialogConfig);
        }
      }, 
      error => {
        console.log(error);
      }
    );
  }

}
