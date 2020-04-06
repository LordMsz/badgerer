import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeTableComponent } from './badge-table.component';

describe('BadgeTableComponent', () => {
  let component: BadgeTableComponent;
  let fixture: ComponentFixture<BadgeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
