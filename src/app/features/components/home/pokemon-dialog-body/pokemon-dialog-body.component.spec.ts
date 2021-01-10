import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDialogBodyComponent } from './pokemon-dialog-body.component';

describe('PokemonDialogBodyComponent', () => {
  let component: PokemonDialogBodyComponent;
  let fixture: ComponentFixture<PokemonDialogBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonDialogBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDialogBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
