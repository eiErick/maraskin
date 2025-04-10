import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OfflineGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!navigator.onLine) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
