import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BadgeHttpService } from './badge-http.service';
import { IBadge } from '../models/IBadge';
import { GraphqlBaseHttpService } from 'app/shared/services';
import { IOffsetPaging } from 'app/shared/models';
import { of } from 'rxjs';

describe('BadgeHttpService', () => {
  let httpTestingController: HttpTestingController;
  let graphSpy: jasmine.SpyObj<GraphqlBaseHttpService>;

  let service: BadgeHttpService;

  beforeEach(() => {
    graphSpy = jasmine.createSpyObj('GraphqlBaseHttpService', ['query']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: GraphqlBaseHttpService, useValue: graphSpy }]
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
    const mockBadges: { badges: IOffsetPaging<IBadge> } = {
      badges: {
        hasNextPage: false,
        hasPreviousPage: false,
        totalItems: 2,
        items: [
          { id: 1, name: 'Test1' },
          { id: 2, name: 'Test2' }
        ]
      }
    };

    graphSpy.query.and.returnValue(of(mockBadges));

    service.getList().subscribe(badges => {
      expect(badges).toBeDefined();
      expect(badges.length).toBe(2);
      expect(badges[0].name).toEqual('Test1');
      expect(badges[1].name).toEqual('Test2');
    });
  });
});
