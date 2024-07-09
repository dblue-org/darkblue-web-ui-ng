import { Injectable } from '@angular/core';
import { Permission, PermissionSearchForm, PermissionVo, SimplePermission } from '@site/app/define/sys/permission';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { Resource, SimpleResource } from '@site/app/define/sys/resource';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  findByPage(searchForm: PermissionSearchForm): Observable<ResponseBean<PermissionVo[]>> {
    return this.http.get<ResponseBean<PermissionVo[]>>('/api/permission/findByPage', {
      params: {
        ...searchForm
      }
    })
    /*return of({
      success: true,
      data: [
        {menuId: '10000', menuName: '用户管理', permissionId: '1', permissionName: '添加用户', permissionCode: 'user:add'},
        {menuId: '10000', menuName: '用户管理',permissionId: '2', permissionName: '删除用户', permissionCode: 'user:delete'},
        {menuId: '10000', menuName: '用户管理',permissionId: '3', permissionName: '修改用户', permissionCode: 'user:update'},
        {menuId: '10000', menuName: '用户管理',permissionId: '4', permissionName: '查询用户', permissionCode: 'user:query'}
      ]
    }).pipe(delay(500))*/
  }

  add(permission: Permission): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/permission/add', permission)
  }

  update(permission: Permission): Observable<ResponseBean<void>> {
    return this.http.put<ResponseBean<void>>('/api/permission/update', permission)
  }

  delete(permissionId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/permission/delete/${permissionId}`)
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
    return this.http.post<ResponseBean<void>>('/api/permission/setResource', {
      permissionId,
      resourceIdList: resourceIds
    })
  }
}
