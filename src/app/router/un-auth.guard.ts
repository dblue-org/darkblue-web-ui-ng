import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';

export const unAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  console.log(authService.isAuthenticated());
  if (!authService.isAuthenticated()) {
    // route.
    inject(Router).navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
