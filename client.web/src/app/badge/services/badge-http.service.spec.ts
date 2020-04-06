import { TestBed } from '@angular/core/testing';

import { BadgeHttpService } from './badge-http.service';

describe('BadgeHttpService', () => {
  let service: BadgeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BadgeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
