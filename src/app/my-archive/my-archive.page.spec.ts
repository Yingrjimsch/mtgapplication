import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArchivePage } from './my-archive.page';

describe('MyArchivePage', () => {
  let component: MyArchivePage;
  let fixture: ComponentFixture<MyArchivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyArchivePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyArchivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
