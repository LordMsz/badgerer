import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GraphqlBaseHttpService } from './graphql-base-http.service';

describe('GraphqlBaseService', () => {
  let httpTestingController: HttpTestingController;
  let service: GraphqlBaseHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GraphqlBaseHttpService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post a simple graphQL query', () => {
    const mockResponse = {
      data: {
        badges: { totalItems: 3 }
      }
    };

    service.query<{badges: { totalItems: number }}>('{ badges { totalItems } }').subscribe(r => {
      expect(r).toBeDefined();
      expect(r?.badges?.totalItems).toBe(3);
    });

    const request = httpTestingController.expectOne('https://localhost:5001/graphql');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toBeDefined();
    expect(request.request.body.query).toBe('{ badges { totalItems } }');
    expect(request.request.body.variables).toBeUndefined();

    request.flush(mockResponse);
  });
});
