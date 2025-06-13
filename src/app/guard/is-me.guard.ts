import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isMeGuard: CanActivateFn = (route, state) => {
  const nickname = route.params['nickname'];
  const loggedNickname = localStorage.getItem('nickname');
  let router = inject(Router);

  if (nickname !== loggedNickname) {
    router.navigate(['/Home']);
    return false
  };

  return true;
};
