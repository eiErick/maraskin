import { Component, OnDestroy } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ModalController, IonButtons, Platform } from '@ionic/angular/standalone';
import { caretBack, chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
  ]
})
export class SettingsComponent implements OnDestroy {
  private backButtonSubscription: Subscription;

  constructor(
    private authService: AuthService,
    public settingsService: SettingsService,
    private modalCtrl: ModalController,
    private platform: Platform,
  ) {
    addIcons({ chevronBackOutline, caretBack });

    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10000, async () => {
      const modal = await this.modalCtrl.getTop();
      if (modal) {
        this.closeModal();
      }
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

  public logout() {
    this.authService.logout();
    this.closeModal();
  }
}
