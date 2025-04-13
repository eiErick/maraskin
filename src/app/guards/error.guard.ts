import { effect, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorGuard implements CanActivate {
  constructor(
    private router: Router,
    private menuService: MenuService
  ) {
    effect (() => {
      if (this.menuService.errorReq()) {
        this.router.navigate(['/error']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  canActivate(): boolean {
    let validate: boolean = false;

    if (this.menuService.errorReq()) {      
      validate = false;
      this.router.navigate(['/error']);
    } else {
      validate = true;
    }
    
    return validate;
  }
}