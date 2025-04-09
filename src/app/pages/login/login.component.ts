import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonAvatar, IonItem, ModalController } from '@ionic/angular/standalone'
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonButton,
    IonContent, 
    IonInput,
    IonAvatar,
    IonItem,
    FormsModule
  ]
})
export class LoginComponent {
  public name: string = '';
  public password: string = '';
  public appid: string = '';
  public appkey: string = '';

  constructor(
    private auth: AuthService,
    private modalCtrl: ModalController
  ) { }

  public async openProfileModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileComponent,
    });
    await modal.present();
  }

  public login() {
    this.auth.setLogin({ appid: this.appid, appkey: this.appkey, name: this.name }, this.password);
  }
}
