import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pokemon, VersionGroupDetails, Move } from '../../../../shared/models/pokemon';
import { Base } from '../../../../shared/interface/base';

@Component({
  selector: 'app-pokemon-dialog-body',
  templateUrl: './pokemon-dialog-body.component.html',
  styleUrls: ['./pokemon-dialog-body.component.scss']
})
export class PokemonDialogBodyComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<PokemonDialogBodyComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Pokemon) { }

  ngOnInit(): void {
    
  }

  close() {
    this.dialogRef.close("Thanks.");
  }

}
