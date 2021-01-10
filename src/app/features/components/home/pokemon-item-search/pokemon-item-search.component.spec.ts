import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonItemSearchComponent } from './pokemon-item-search.component';

describe('PokemonItemSearchComponent', () => {
  let component: PokemonItemSearchComponent;
  let fixture: ComponentFixture<PokemonItemSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonItemSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonItemSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
