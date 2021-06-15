import { TestBed } from '@angular/core/testing';

import { CollegeDataService } from './college-data.service';

describe('CollegeDataService', () => {
  let service: CollegeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
