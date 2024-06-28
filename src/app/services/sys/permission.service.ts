import { Injectable } from '@angular/core';
import { Permission, PermissionSearchForm, PermissionVo, SimplePermission } from '@site/app/define/sys/permission';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { Resource, SimpleResource } from '@site/app/define/sys/resource';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor() { }

  findByPage(searchForm: PermissionSearchForm): Observable<ResponseBean<PermissionVo[]>> {
    return of({
      success: true,
      data: [
        {menuId: '10000', menuName: '用户管理', permissionId: '1', permissionName: '添加用户', permissionCode: 'user:add'},
        {menuId: '10000', menuName: '用户管理',permissionId: '2', permissionName: '删除用户', permissionCode: 'user:delete'},
        {menuId: '10000', menuName: '用户管理',permissionId: '3', permissionName: '修改用户', permissionCode: 'user:update'},
        {menuId: '10000', menuName: '用户管理',permissionId: '4', permissionName: '查询用户', permissionCode: 'user:query'}
      ]
    }).pipe(delay(500))
  }

  add(permission: Permission): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }

  update(permission: Permission): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }

  delete(permissionId: string): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }

  getResources(permissionId: string): Observable<ResponseBean<SimpleResource[]>> {
    return of({
      success: true,
      data: [
        {
          resourceId: '111',
          resourceName: '添加用户',
          resourceUrl: '/api/user/add',
          requestMethod: 'POST',
        }
      ]
    }).pipe(delay(500))
  }

  bindResources(permissionId: string, resourceIds: string[]): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }
}
