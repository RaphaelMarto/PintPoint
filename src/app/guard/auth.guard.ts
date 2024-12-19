import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../pages/service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);

  const token = localStorage.getItem('token');

  if (token === null) {
    authService.emitIsShowned();
    return false;
  }

  // do refresh logic mofif ngmodel to form
  if (authService.tokenExpired(token)) {
    authService.logout();
    authService.emitIsShowned();
    return false;
  }

  return true;
};
