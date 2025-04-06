import { Injectable, signal } from '@angular/core';
import { Auth } from '../models/auth';
import { EncryptedstorageService } from '../services/encryptedstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = signal<boolean>(this.hasToken());

  constructor (
    private encryptedstorageService: EncryptedstorageService,
    private route: Router,
  ) {}

  public isAuthenticated(): boolean {
    return this.authenticated();
  }

  public setLogin(auth: Auth, password: string) {
    this.encryptedstorageService.setEncryptionKey(password);
    this.encryptedstorageService.save('auth', auth);

    this.authenticated.set(true);
    this.route.navigate(['menu']);
    console.log('login');
  }

  private hasToken(): boolean {
    const auth = localStorage.getItem('auth');

    if (auth) {
      return true;
    } else {
      return false;
    }
  }
}