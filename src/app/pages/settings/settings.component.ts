import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ModalController, IonButtons, Platform, IonItem, IonLabel, IonToggle } from '@ionic/angular/standalone';
import { caretBack, chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

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
    IonItem,
    IonLabel,
    IonToggle,
    FormsModule
  ]
})
export class SettingsComponent implements OnInit, OnDestroy {
  private backButtonSubscription: Subscription;
  public darkMode: boolean = false;

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

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = localStorage.getItem('theme') === 'dark' || prefersDark.matches;
    this.setTheme();
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

  public toggleTheme() {
    this.darkMode = !this.darkMode;
    this.setTheme();
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
  }

  public setTheme() {    
    document.body.classList.toggle('ion-palette-dark', this.darkMode);
  }
}
