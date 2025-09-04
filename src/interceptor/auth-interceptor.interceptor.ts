import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../app/pages/service/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const clonedReq = req.clone({ withCredentials: true });

  return next(clonedReq).pipe(
    catchError((error) => {
      // If unauthorized, try to refresh
      if (error.status === 401 && !req.url.includes('/Refresh')) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            // Retry the original request after refresh
            const retryReq = req.clone({ withCredentials: true });
            return next(retryReq);
          }),
          catchError((refreshErr) => {
            // If refresh fails, logout
            authService.logout();
            authService.emitIsConnected();
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => error);
    })
  );
};