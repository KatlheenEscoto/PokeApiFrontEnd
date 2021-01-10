import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMoveSearchComponent } from './pokemon-move-search.component';

describe('PokemonMoveSearchComponent', () => {
  let component: PokemonMoveSearchComponent;
  let fixture: ComponentFixture<PokemonMoveSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonMoveSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonMoveSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
