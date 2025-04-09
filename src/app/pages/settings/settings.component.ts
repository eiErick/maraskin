import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ModalController, IonButtons, Platform, IonItem, IonToggle } from '@ionic/angular/standalone';
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
    IonToggle,
    FormsModule
  ]
})
export class SettingsComponent implements OnDestroy {
  private backButtonSubscription: Subscription;
  public isDarkMode: boolean = true;

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

    // this.initTheme();
  }

  initTheme() {
    const storedTheme = localStorage.getItem('dark-mode');
    if (storedTheme === null) {
      document.body.classList.add('dark');
      localStorage.setItem('dark-mode', 'true');
      this.isDarkMode = true;
    } else {
      this.isDarkMode = storedTheme === 'true';
      if (this.isDarkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  }

  toggleTheme(event: any) {
    this.isDarkMode = event.detail.checked;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('dark-mode', this.isDarkMode.toString());
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
