import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonLabel
  ]
})
export class FooterComponent {
  constructor() {}
}
