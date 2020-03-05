import { TestBed } from '@angular/core/testing';

import { DateDiffService } from './date-diff.service';

describe('DateDiffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateDiffService = TestBed.get(DateDiffService);
    expect(service).toBeTruthy();
  });
});
