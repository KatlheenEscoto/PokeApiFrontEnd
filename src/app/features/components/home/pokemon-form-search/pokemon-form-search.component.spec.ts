import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFormSearchComponent } from './pokemon-form-search.component';

describe('PokemonFormSearchComponent', () => {
  let component: PokemonFormSearchComponent;
  let fixture: ComponentFixture<PokemonFormSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonFormSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonFormSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
