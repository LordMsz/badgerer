import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'app/material.module';

import { TeamHttpService } from './team-http.service';

describe('TeamHttpService', () => {
  let service: TeamHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MaterialModule]
    });
    service = TestBed.inject(TeamHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
