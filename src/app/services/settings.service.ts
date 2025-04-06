import { Injectable, signal } from '@angular/core';
import { Auth } from '../models/auth';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public auth = signal<Auth>({ appid: '', appkey: '', name: '' });

  constructor(
    private storageService: StorageService,
  ) {
    this.getSetting();
  }

  private getSetting() {
    const auth = this.storageService.get('auth');

    if (auth) {
      this.auth.set(auth);
    }
  }
}
