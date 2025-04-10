import { Component, input } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonAvatar, IonTitle, ModalController, IonProgressBar } from '@ionic/angular/standalone';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonAvatar,
    IonTitle,
    IonProgressBar
  ]
})
export class HeaderComponent {
  public title = input.required<string>();
  public load = input(false);

  constructor(
    private modalCtrl: ModalController,
  ) {}

  public openSettings() {
    this.modalCtrl.create({
      component: SettingsComponent,
    }).then((m) => m.present());
  }
}
