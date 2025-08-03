import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return router.createUrlTree(['/login']);
  }

  const token = localStorage.getItem('token');
  return !!token || router.createUrlTree(['/login']);
};
