import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../app/pages/service/auth.service';
import { RefreshToken } from '../app/interface/iRefreshToken';
import { switchMap, catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  let token = localStorage.getItem('token');

  // Exclude refresh token endpoint from interception
  if (req.url.includes('/Refresh')) {
    return next(req);
  }

  // If no token
  if (!token) {
    return next(req);
  }

  // If token expired
  if (authService.tokenExpired(token)) {
    return authService.refreshToken().pipe(
      switchMap((response: RefreshToken) => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        authService.emitIsConnected();
        const clonedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${response.accessToken}`),
        });
        return next(clonedReq);
      }),
      catchError((err) => {
        console.error('Refresh token error:', err);
        authService.logout();
        authService.emitIsShowned();
        return next(req);
      })
    );
  }

  // Token valid
  const clonedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(clonedReq);
};