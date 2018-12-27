import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckListPage } from './deck-list.page';

describe('DeckListPage', () => {
  let component: DeckListPage;
  let fixture: ComponentFixture<DeckListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
