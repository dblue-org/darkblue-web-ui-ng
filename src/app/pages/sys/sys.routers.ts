import { Routes } from '@angular/router';
import {MenuManageComponent} from "./menu-manage/menu-manage.component";
import { UserManageComponent } from './user-manage/user-manage.component';

export const SYS_ROUTES: Routes = [
  { path: 'menu', component: MenuManageComponent, data: {title: '菜单管理'}, title: '菜单管理'},
  { path: 'user', component: UserManageComponent, data: {title: '用户管理'}, title: '用户管理'},
];
