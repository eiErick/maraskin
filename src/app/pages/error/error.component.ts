import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonButton
  ],
})
export class ErrorComponent {

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router,
  ) {
    effect(() => {
      if (!this.menuService.errorReq()) {        
        this.router.navigate(['/']);
      }
    });
  }

  public logout() {
    this.authService.logout();
  }
}
