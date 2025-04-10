import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  constructor(
    private router: Router,
  ) {
    this.initializeNetworkEvents();
  }

  private initializeNetworkEvents() {
    this.checkInitialConnection();
    window.addEventListener('offline', () => this.goToOffline());
    window.addEventListener('online', () => this.goToOnline());
  }

  private checkInitialConnection() {
    if (!navigator.onLine) {
      this.goToOffline();
    }
  }

  public goToOnline() {
    this.router.navigate(['/']);
  }
  
  public goToOffline() {
    this.router.navigate(['/offline']);
  }
}
