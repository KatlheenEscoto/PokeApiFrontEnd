import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMoveDialogBodyComponent } from './pokemon-move-dialog-body.component';

describe('PokemonMoveDialogBodyComponent', () => {
  let component: PokemonMoveDialogBodyComponent;
  let fixture: ComponentFixture<PokemonMoveDialogBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonMoveDialogBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonMoveDialogBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
