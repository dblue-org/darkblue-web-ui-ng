import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './router/auth.guard';
import { unAuthGuard } from './router/un-auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/welcome'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.routes').then(m => m.LoginRoutes),
    canActivate: [authGuard]
  },
  {
    path: 'welcome',
    component: LayoutComponent,
    loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES),
    canActivate: [unAuthGuard]
  }
];

