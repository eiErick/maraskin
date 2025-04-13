import { Routes } from '@angular/router';
import { AuthGuard } from './guards/guard.guard';
import { FooterComponent } from './components/footer/footer.component';
import { OfflineGuard } from './guards/offline.guard';
import { ErrorGuard } from './guards/error.guard';

export const routes: Routes = [
  {
    path: '',
    component: FooterComponent,
    children: [
      {
        path: 'menu',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
        canActivate: [AuthGuard, OfflineGuard, ErrorGuard],
      },
      {
        path: 'snack',
        loadComponent: () => import('./pages/snack/snack.component').then((m) => m.SnackComponent),
        canActivate: [AuthGuard, OfflineGuard, ErrorGuard],
      },
      {
        path: 'lunch',
        loadComponent: () => import('./pages/lunch/lunch.component').then((m) => m.LunchComponent),
        canActivate: [AuthGuard, OfflineGuard, ErrorGuard],
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
    canActivate: [OfflineGuard],
  },
  {
    path: 'offline',
    loadComponent: () => import('./pages/offline/offline.page').then( m => m.OfflinePage),
  },
  {
    path: 'error',
    loadComponent: () => import('./pages/error/error.component').then( m => m.ErrorComponent),
  },
];
