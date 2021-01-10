import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMoveListComponent } from './pokemon-move-list.component';

describe('PokemonMoveListComponent', () => {
  let component: PokemonMoveListComponent;
  let fixture: ComponentFixture<PokemonMoveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonMoveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonMoveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
