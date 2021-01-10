import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonItemDialogBodyComponent } from './pokemon-item-dialog-body.component';

describe('PokemonItemDialogBodyComponent', () => {
  let component: PokemonItemDialogBodyComponent;
  let fixture: ComponentFixture<PokemonItemDialogBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonItemDialogBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonItemDialogBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
