import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';

export const WELCOME_ROUTES: Routes = [
  { path: '', component: WelcomeComponent, data: {title: '首页'}, title: '首页'},
];
