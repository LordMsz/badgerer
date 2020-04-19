import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { BadgeListComponent } from './badge-list.component';
import { IBadge } from '../../models/IBadge';
import { BadgeHttpService } from '../../services';

class BadgeHttpServiceMock {
  public getList(): Observable<IBadge[]> {
    return of([]);
  }
}

describe('BadgeListComponent', () => {
  let component: BadgeListComponent;
  let fixture: ComponentFixture<BadgeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{provide: BadgeHttpService, useValue: new BadgeHttpServiceMock()}],
      declarations: [ BadgeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
