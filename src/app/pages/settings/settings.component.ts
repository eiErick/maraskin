import { Component, OnDestroy } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ModalController, IonButtons, Platform, IonToggle } from '@ionic/angular/standalone';
import { caretBack, chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { StatusBar, Style } from '@capacitor/status-bar';


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
    FormsModule,
    IonToggle
  ]
})
export class SettingsComponent implements OnDestroy {
  private backButtonSubscription: Subscription;
  public isDarkMode: boolean = false;

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

    this.loadTheme();
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  public loadTheme() {
    const storedTheme = localStorage.getItem('dark-mode');

    if (storedTheme) {
      const theme = JSON.parse(storedTheme);
      this.isDarkMode = theme;
    } else {
      this.isDarkMode = false
    }
  }

  public toggleTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.remove('app-light');
      document.documentElement.classList.add('app-dark');

      StatusBar.setBackgroundColor({ color: '#7662DA' });
      StatusBar.setStyle({ style: Style.Dark });      
    } else {
      document.documentElement.classList.remove('app-dark');
      document.documentElement.classList.add('app-light');
      
      StatusBar.setBackgroundColor({ color: '#423671' });
      StatusBar.setStyle({ style: Style.Dark });
    }

    localStorage.setItem('dark-mode', this.isDarkMode.toString());
  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

  public logout() {
    this.authService.logout();
    this.closeModal();
  }
}
