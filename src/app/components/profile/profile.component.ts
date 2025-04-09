import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonTitle, ModalController, IonImg } from '@ionic/angular/standalone'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonContent,
    IonTitle,
    IonImg
  ],
})
export class ProfileComponent {
  avatars = [

  ];

  constructor(private modalCtrl: ModalController) {}

  public selectProfile(avatar: any) {
    localStorage.setItem('selectedProfile', JSON.stringify(avatar));
    this.modalCtrl.dismiss(avatar);
  }

  public dismiss() {
    this.modalCtrl.dismiss();
  }
}
