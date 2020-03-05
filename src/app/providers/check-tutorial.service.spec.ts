import { TestBed } from '@angular/core/testing';

import { CheckTutorialService } from './check-tutorial.service';

describe('CheckTutorialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckTutorialService = TestBed.get(CheckTutorialService);
    expect(service).toBeTruthy();
  });
});
