import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { errorGuard } from './error.guard';

describe('errorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => errorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
