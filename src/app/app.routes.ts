import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './guard/auth.guard';
import { unAuthGuard } from './guard/un-auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.routes').then(m => m.LoginRoutes),
    canActivate: [authGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES),
        canActivate: [unAuthGuard]
      },
      {
        path: 'sys',
        loadChildren: () => import('./pages/sys/sys.routers').then(m => m.SYS_ROUTES),
        canActivate: [unAuthGuard]
      },
      {
        path: 'logs',
        loadChildren: () => import('./pages/logs/logs.routers').then(m => m.LOGS_ROUTES),
        canActivate: [unAuthGuard]
      },
      {
        path: 'setting',
        loadChildren: () => import('./pages/settings/settings.routers').then(m => m.SETTINGS_ROUTES),
        canActivate: [unAuthGuard]
      },
      {
        path: 'ops',
        loadChildren: () => import('./pages/ops/ops.routers').then(m => m.OPS_ROUTES),
        canActivate: [unAuthGuard]
      }
    ]
  },
];

