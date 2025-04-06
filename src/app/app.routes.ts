import { Routes } from '@angular/router';
import { AuthGuard } from './guards/guard.guard';
import { FooterComponent } from './components/footer/footer.component';

export const routes: Routes = [
  {
    path: '',
    component: FooterComponent,
    children: [
      {
        path: 'menu',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
        canActivate: [AuthGuard],
      },
      {
        path: 'snack',
        loadComponent: () => import('./pages/snack/snack.component').then((m) => m.SnackComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'lunch',
        loadComponent: () => import('./pages/lunch/lunch.component').then((m) => m.LunchComponent),
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'menu',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  }
];
