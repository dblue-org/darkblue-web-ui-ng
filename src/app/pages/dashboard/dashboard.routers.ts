import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { DkComponentsComponent } from '@site/app/pages/dashboard/dk-components/dk-components.component';

export const DASHBOARD_ROUTES: Routes = [
  {path: 'custom-components', component: DkComponentsComponent, title: '自定义组件', data: {shouldReuse: true}}
];
