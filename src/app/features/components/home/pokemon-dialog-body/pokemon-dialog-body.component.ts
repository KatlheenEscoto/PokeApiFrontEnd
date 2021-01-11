import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pokemon } from '../../../../shared/models/pokemon';
import { PokemonAll, Versiongroupdetail, Move } from '../../../../shared/models/pokemonAll';

@Component({
  selector: 'app-pokemon-dialog-body',
  templateUrl: './pokemon-dialog-body.component.html',
  styleUrls: ['./pokemon-dialog-body.component.scss']
})
export class PokemonDialogBodyComponent implements OnInit {

  moves: Move[];
  versions: Versiongroupdetail[];


  constructor( public dialogRef: MatDialogRef<PokemonDialogBodyComponent>,
               @Inject(MAT_DIALOG_DATA) public data: PokemonAll) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close("Thanks.");
  }

}
