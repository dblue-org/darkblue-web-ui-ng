import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { Resource, ResourceSearchForm } from '@site/app/define/sys/resource';
import { SimplePermission } from '@site/app/define/sys/permission';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor() { }

  findByPage(searchForm: ResourceSearchForm): Observable<ResponseBean<Resource[]>> {
    return of({
      success: true,
      data: [
        {
          resourceId: '111',
          resourceName: '添加用户',
          resourceUrl: '/api/user/add',
          requestMethod: 'POST',
          controller: 'org.dblue.application.module.user.controller.UserController',
          method: 'add',
          isAuthedAccess: false,
          createTime: '2022-11-11 11:11:11',
          permissions: [
            {permissionId: '1', permissionName: '添加用户', permissionCode: 'user:add'},
            {permissionId: '2', permissionName: '删除用户', permissionCode: 'user:delete'},
            {permissionId: '3', permissionName: '修改用户', permissionCode: 'user:update'},
            {permissionId: '4', permissionName: '查询用户', permissionCode: 'user:query'}
          ]
        },
        {
          resourceId: '222',
          resourceName: '修改用户',
          resourceUrl: '/api/user/update',
          requestMethod: 'POST',
          controller: 'org.dblue.application.module.user.controller.UserController',
          method: 'update',
          isAuthedAccess: false,
          createTime: '2022-11-11 11:11:11',
          permissions: [
            {permissionId: '3', permissionName: '修改用户', permissionCode: 'user:update'}
          ]
        }
      ],
      total: 1
    }).pipe(delay(1000))
  }

  add(resource: Resource): Observable<ResponseBean<void>> {
    return of({
      success: true,
    }).pipe(delay(1000))
  }

  update(resource: Resource): Observable<ResponseBean<void>> {
    return of({
      success: true,
    }).pipe(delay(1000))
  }

  delete(resourceId: string): Observable<ResponseBean<void>> {
    return of({
      success: true,
    }).pipe(delay(1000))
  }

  saveResourcePermissions(resourceId: string, permissions: SimplePermission[]): Observable<ResponseBean<void>> {
    return of({
      success: true,
    }).pipe(delay(1000))
  }
}
