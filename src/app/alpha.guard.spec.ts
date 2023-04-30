import { TestBed } from '@angular/core/testing';

import { AlphaGuard } from './alpha.guard';

describe('AlphaGuard', () => {
  let guard: AlphaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlphaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
