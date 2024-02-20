import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoged = authService.isLoged();

  if (isLoged) {
    return true;
  } else {
    router.navigate(['/user/login']);
    return false;
  }
};
