import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../models/auth';
import { AlertController } from '@ionic/angular/standalone';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = signal<boolean>(this.hasToken());

  constructor (
    private storageService: StorageService,
    private route: Router,
    private alertController: AlertController,
  ) {}

  public isAuthenticated(): boolean {
    return this.authenticated();
  }

  public setLogin(auth: Auth, password: string) {
    // this.encryptedstorageService.setEncryptionKey(password);
    this.storageService.save('auth', auth);

    this.authenticated.set(true);
    this.route.navigate(['menu']);
  }

  public async logout() {    
    const alert = await this.alertController.create({
      header: 'Confirmar Deleção',
      message: "Tem certeza que deseja sair?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Sair',
          handler: () => {
            this.storageService.removeAll();
            this.authenticated.set(false);
            this.route.navigate(['login']);
          },
        },
      ],
    });
  
    await alert.present();
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
