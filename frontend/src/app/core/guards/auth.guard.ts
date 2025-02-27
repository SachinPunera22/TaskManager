import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const isLoggedIn = localStorage.getItem('userToken') ? true : false;

  if (!isLoggedIn) {
    _Router.navigate(['/login']);
    return false;
  }
  else {
    return true;
  }
};
