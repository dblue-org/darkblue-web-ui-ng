import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/welcome'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.routes').then(m => m.LoginRoutes)
  },
  {
    path: 'welcome',
    component: LayoutComponent,
    loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES)
  }
];

