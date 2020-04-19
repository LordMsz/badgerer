import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BadgeHttpService } from './badge-http.service';
import { IBadge } from '../models/IBadge';

describe('BadgeHttpService', () => {
  let httpTestingController: HttpTestingController;

  let service: BadgeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BadgeHttpService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get simple list', () => {
    const mockBadges: IBadge[] = [
      { badgeId: 1, name: 'Test1' },
      { badgeId: 2, name: 'Test2' }
    ];

    service.getList().subscribe(badges => {
      expect(badges).toBeDefined();
      expect(badges.length).toBe(2);
      expect(badges[0].name).toEqual('Test1');
      expect(badges[1].name).toEqual('Test2');
    });

    const request = httpTestingController.expectOne('https://localhost:5001/Badges');
    expect(request.request.method).toEqual('GET');

    request.flush(mockBadges);
  });
});
