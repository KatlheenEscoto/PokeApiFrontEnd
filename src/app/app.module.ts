import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { PokemonDetailsComponent } from './features/components/home/pokemon-details/pokemon-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/components/modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonListComponent } from './features/components/home/pokemon-list/pokemon-list.component';
import { SortPipe } from './shared/pipes/sort.pipe';
import { PokemonSearchComponent } from './features/components/home/pokemon-search/pokemon-search.component';
import { PokemonMoveListComponent } from './features/components/home/pokemon-move-list/pokemon-move-list.component';
import { PokemonDialogBodyComponent } from './features/components/home/pokemon-dialog-body/pokemon-dialog-body.component';
import { PokemonMoveDialogBodyComponent } from './features/components/home/pokemon-move-dialog-body/pokemon-move-dialog-body.component';
import { PokemonMoveSearchComponent } from './features/components/home/pokemon-move-search/pokemon-move-search.component';
import { PokemonItemDialogBodyComponent } from './features/components/home/pokemon-item-dialog-body/pokemon-item-dialog-body.component';
import { PokemonItemSearchComponent } from './features/components/home/pokemon-item-search/pokemon-item-search.component';
import { PokemonItemListComponent } from './features/components/home/pokemon-item-list/pokemon-item-list.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { PokemonFormSearchComponent } from './features/components/home/pokemon-form-search/pokemon-form-search.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PokemonDetailsComponent,
    PokemonListComponent,
    SortPipe,
    PokemonSearchComponent,
    PokemonMoveListComponent,
    PokemonDialogBodyComponent,
    PokemonMoveDialogBodyComponent,
    PokemonMoveSearchComponent,
    PokemonItemDialogBodyComponent,
    PokemonItemSearchComponent,
    PokemonItemListComponent,
    FilterPipe,
    PokemonFormSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ScrollingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    SortPipe,
    FilterPipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PokemonDialogBodyComponent,
    PokemonMoveDialogBodyComponent,
    PokemonItemDialogBodyComponent
  ]
})
export class AppModule { }
