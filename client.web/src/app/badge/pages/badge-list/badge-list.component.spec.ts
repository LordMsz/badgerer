import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { MaterialModule } from 'app/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { BadgeListComponent } from './badge-list.component';
import { IBadge } from '../../models/IBadge';
import { BadgeHttpService } from '../../services';
import { BadgeTableComponent } from '@badgerer/badge/components/badge-table/badge-table.component';

class BadgeHttpServiceMock {
  public getList(): Observable<IBadge[]> {
    return of([]);
  }

  public getTotal() : Observable<number> {
    return of(0);
  }
}

describe('BadgeListComponent', () => {
  let component: BadgeListComponent;
  let fixture: ComponentFixture<BadgeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [{provide: BadgeHttpService, useValue: new BadgeHttpServiceMock()}],
      declarations: [ BadgeListComponent, BadgeTableComponent ]
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
