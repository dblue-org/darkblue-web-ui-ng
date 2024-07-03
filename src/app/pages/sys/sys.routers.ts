import { Routes } from '@angular/router';
import {MenuManageComponent} from "./menu-manage/menu-manage.component";
import { UserManageComponent } from './user-manage/user-manage.component';
import { RoleManageComponent } from '@site/app/pages/sys/role-manage/role-manage.component';
import { PermissionManageComponent } from '@site/app/pages/sys/permission-manage/permission-manage.component';
import { ResourceManageComponent } from '@site/app/pages/sys/resource-manage/resource-manage.component';
import { UserDetailsComponent } from '@site/app/pages/sys/user-manage/user-details/user-details.component';
import { RoleDetailsComponent } from '@site/app/pages/sys/role-manage/role-details/role-details.component';
import {
  PermissionDetailsComponent
} from '@site/app/pages/sys/permission-manage/permission-details/permission-details.component';
import { UserGroupManageComponent } from '@site/app/pages/sys/user-group-manage/user-group-manage.component';
import {
  UserGroupDetailsComponent
} from '@site/app/pages/sys/user-group-manage/user-group-details/user-group-details.component';
import { PositionManageComponent } from '@site/app/pages/sys/position-manage/position-manage.component';
import {
  PositionDetailsManageComponent
} from '@site/app/pages/sys/position-manage/position-details-manage/position-details-manage.component';

export const SYS_ROUTES: Routes = [
  { path: 'menu', component: MenuManageComponent, title: '菜单管理'},
  { path: 'user', component: UserManageComponent, title: '用户管理'},
  { path: 'user/details', component: UserDetailsComponent, title: '用户详情'},
  { path: 'user-group', component: UserGroupManageComponent, title: '用户组管理'},
  { path: 'user-group/details', component: UserGroupDetailsComponent, title: '用户组详情'},
  { path: 'position', component: PositionManageComponent, title: '职位管理'},
  { path: 'position/details', component: PositionDetailsManageComponent, title: '职位详情'},
  { path: 'role', component: RoleManageComponent, title: '角色管理'},
  { path: 'role/details', component: RoleDetailsComponent, title: '角色详情'},
  { path: 'permission', component: PermissionManageComponent, title: '权限管理'},
  { path: 'permission/details', component: PermissionDetailsComponent, title: '权限详情'},
  { path: 'resource', component: ResourceManageComponent, title: '资源管理'},
];
