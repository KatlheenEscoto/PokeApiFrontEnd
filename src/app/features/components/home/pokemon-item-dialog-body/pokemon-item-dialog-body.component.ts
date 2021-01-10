import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Effectentry } from '../../../../shared/models/itemAll';

@Component({
  selector: 'app-pokemon-item-dialog-body',
  templateUrl: './pokemon-item-dialog-body.component.html',
  styleUrls: ['./pokemon-item-dialog-body.component.scss']
})
export class PokemonItemDialogBodyComponent implements OnInit {

  // Variables.
  effect: Effectentry;

  constructor( public dialogRef: MatDialogRef<PokemonItemDialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
