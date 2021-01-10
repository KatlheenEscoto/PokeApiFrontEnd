import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonItemListComponent } from './pokemon-item-list.component';

describe('PokemonItemListComponent', () => {
  let component: PokemonItemListComponent;
  let fixture: ComponentFixture<PokemonItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
