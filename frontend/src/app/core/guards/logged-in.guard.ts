import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const isLoggedIn = localStorage.getItem('userToken') ? true : false;

  if (isLoggedIn) {
    _Router.navigate(['/tasks']);
    return false;
  }
  return true;
};
