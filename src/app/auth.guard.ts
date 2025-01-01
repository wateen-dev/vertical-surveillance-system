import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  canActivate(): boolean {
    if (typeof window !== 'undefined') {
      const isLoggedIn = !!sessionStorage.getItem('userContent') || !!localStorage.getItem('userContent');

      if (isLoggedIn) {
        return true; // User is logged in
      }
      this.router.navigate(['/login']); // Redirect to login page
    }
    return false; // User is not logged in
  }
}
