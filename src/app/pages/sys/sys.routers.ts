import { Routes } from '@angular/router';
import {MenuManageComponent} from "./menu-manage/menu-manage.component";

export const SYS_ROUTES: Routes = [
  { path: 'menu', component: MenuManageComponent, data: {title: '菜单管理'}, title: '菜单管理'},
];
