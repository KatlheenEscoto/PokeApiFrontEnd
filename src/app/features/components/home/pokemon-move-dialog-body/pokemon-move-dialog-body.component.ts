import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-move-dialog-body',
  templateUrl: './pokemon-move-dialog-body.component.html',
  styleUrls: ['./pokemon-move-dialog-body.component.scss']
})
export class PokemonMoveDialogBodyComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<PokemonMoveDialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
