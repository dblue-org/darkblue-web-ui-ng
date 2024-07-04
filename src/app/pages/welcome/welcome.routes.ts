import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';

export const WELCOME_ROUTES: Routes = [
  { path: '', component: WelcomeComponent, title: '首页', data: {shouldReuse: true}},
];
