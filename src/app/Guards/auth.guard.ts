import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../Services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const isLoged = tokenService.isLoged();
  console.log('isLoged', isLoged);

  if (isLoged) {
    return true;
  } else {
    router.navigate(['/Auth/login']);
    return false;
  }
};
