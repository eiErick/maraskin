import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { StatusBar, Style } from '@capacitor/status-bar';
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  public darkMode = false;
  
  constructor(
    private platform: Platform,
    private networkService: NetworkService,
  ) {
    this.initializeApp();

  }

  public initializeApp() {
    this.setStatusBarStyle();
    this.initTheme();
  }

  private initTheme() {
    const storedTheme = localStorage.getItem('dark-mode');

    if (storedTheme) {
      const theme = JSON.parse(storedTheme);
      theme ? document.documentElement.classList.add('app-dark') : document.documentElement.classList.add('app-light')
    } else {
      document.documentElement.classList.add('app-light');
      localStorage.setItem('dark-mode', 'false');
    }
  }

  public setStatusBarStyle = async () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#000000' });
    } else {
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#ffffff' });
    }
  };
}
