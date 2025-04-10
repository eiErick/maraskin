import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { offlineGuard } from './offline.guard';

describe('offlineGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => offlineGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
