import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isMeGuard } from './is-me.guard';

describe('isMeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isMeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
