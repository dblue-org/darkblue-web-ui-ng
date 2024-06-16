import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  if (authService.isAuthenticated()) {
    // route.
    inject(Router).navigate(['/welcome']);
    return false;
  } else {
    return true;
  }
};
