import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { BadgeDetailComponent } from './badge-detail.component';
import { IBadge } from '@badgerer/badge/models';
import { BadgeHttpService } from '@badgerer/badge/services';

class BadgeDetailHttpServiceMock {
  public get(): Observable<IBadge> {
    return of({badgeId: 1, name: 'test', description: 'description test'});
  }
}

describe('BadgeDetailComponent', () => {
  let component: BadgeDetailComponent;
  let fixture: ComponentFixture<BadgeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [{provide: BadgeHttpService, useValue: new BadgeDetailHttpServiceMock()}],
      declarations: [ BadgeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
