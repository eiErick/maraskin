import { Component, input } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonAvatar, IonTitle, ModalController } from '@ionic/angular/standalone';
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
  ]
})
export class HeaderComponent {
  public title = input.required<string>();
  public load = input(false);
  private currentAudio: HTMLAudioElement | null = null;

  constructor(
    private modalCtrl: ModalController,
  ) {}

  public openSettings() {
    this.modalCtrl.create({
      component: SettingsComponent,
    }).then((m) => m.present());
  }

  public playKiam() {
    if (!this.currentAudio || this.currentAudio.paused) {
      this.currentAudio = new Audio("assets/kiam.mp3");
      this.currentAudio.play();
    }
  }
}
