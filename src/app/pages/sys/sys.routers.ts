import { Routes } from '@angular/router';
import {MenuManageComponent} from "./menu-manage/menu-manage.component";
import { UserManageComponent } from './user-manage/user-manage.component';
import { RoleManageComponent } from '@site/app/pages/sys/role-manage/role-manage.component';
import { PermissionManageComponent } from '@site/app/pages/sys/permission-manage/permission-manage.component';
import { ResourceManageComponent } from '@site/app/pages/sys/resource-manage/resource-manage.component';
import { UserDetailsComponent } from '@site/app/pages/sys/user-manage/user-details/user-details.component';

export const SYS_ROUTES: Routes = [
  { path: 'menu', component: MenuManageComponent, title: '菜单管理'},
  { path: 'user', component: UserManageComponent, title: '用户管理'},
  { path: 'user/details', component: UserDetailsComponent, title: '用户详情'},
  { path: 'role', component: RoleManageComponent, title: '角色管理'},
  { path: 'permission', component: PermissionManageComponent, title: '权限管理'},
  { path: 'resource', component: ResourceManageComponent, title: '资源管理'},
];
