import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PokemonMoveDialogBodyComponent } from '../pokemon-move-dialog-body/pokemon-move-dialog-body.component';
import { PokemonService } from '../../../services/pokemon.service';
import { SortPipe } from '../../../../shared/pipes/sort.pipe';
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';
import { Move } from '../../../../shared/models/move';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-move-list',
  templateUrl: './pokemon-move-list.component.html',
  styleUrls: ['./pokemon-move-list.component.scss']
})
export class PokemonMoveListComponent implements OnInit {

  @Input() moveList;
  @Input() chargeData;
  copyMoveList: Move[];
  moveForm: FormGroup;
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  categories: string[] = ["1", "2"];
  filteredCategories: Observable<string[]>;

  constructor(private matDialog: MatDialog, 
              private _pokemon: PokemonService,
              private sortPipe: SortPipe, 
              private filterPipe: FilterPipe,
              private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.copyMoveList = this.moveList;
    this.initForm();
    this.getData();
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
            power: response.power,
            type_name: response.type.name,
            category_name: response.meta.category.name
          }
          this.matDialog.open(PokemonMoveDialogBodyComponent, dialogConfig);
        }
      }, 
      error => {
        console.log(error);
      }
    );
  }

  orderByDesc() {
    this.moveList = this.sortPipe.transform(this.moveList, "desc", "name");
  }

  orderByAsc() {
    this.moveList = this.sortPipe.transform(this.moveList, "asc", "name");
  }

  originalList() {
    this.moveList = this.copyMoveList;
  }


  clear() {
    this.moveForm.reset();
  }

  initForm() {
    this.moveForm = this.formBuilder.group(
      {
        name: [''],
        type_name: [''],
        category_name: ['']
      }
    );
  }

  onSubmit() {
    console.log(this.moveForm.value);
    let name: string = this.moveForm.value.name;
    let moveFilter = {};
    if(name && name.length > 0 ){
      moveFilter = {name: name};
      console.log(moveFilter);
      this.moveList = this.filterPipe.transform(this.moveList, moveFilter); 
    } else {
      this.moveList = this.copyMoveList;
    }  
  }

  async getData() {
    const response = await this._pokemon.getTypes().toPromise();
    if(response) {
      let types = response.results;
      for(let type of types){
        this.options.push(type.name);
      }
      this.filteredOptions = this.moveForm.controls['type_name'].valueChanges.pipe(
        startWith(""), 
        map(val => this.filterType(val))
      );
    }

    this.filteredCategories = this.moveForm.controls['category_name'].valueChanges.pipe(
      startWith(""), 
      map(val => this.filterCategory(val))
    );
  }

  filterType(val: string): string[] {
    return this.options.filter(option => {
      return option.toLowerCase().match(val.toLowerCase());
    });
  }

  filterCategory(val: string): string[] {
    return this.categories.filter(category => {
      return category.toLowerCase().match(val.toLowerCase());
    });
  }
  
}
