import { Injectable } from '@angular/core';
import {
  Permission,
  PermissionDetailsVo,
  PermissionRoleQueryDto,
  PermissionSearchForm,
  PermissionVo
} from '@site/app/define/sys/permission';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { PermissionResourceVo } from '@site/app/define/sys/resource';
import { HttpClient } from '@angular/common/http';
import { PermissionRoleVo } from '@site/app/define/sys/role';

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
  }

  getDetails(permissionId: string): Observable<ResponseBean<PermissionDetailsVo>> {
    return this.http.get<ResponseBean<PermissionDetailsVo>>(`/api/permission/getOne/${permissionId}`)
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

  getResources(permissionId: string): Observable<ResponseBean<PermissionResourceVo[]>> {
    return this.http.get<ResponseBean<PermissionResourceVo[]>>(`/api/permission/findPermissionResource/${permissionId}`);
  }

  bindResources(permissionId: string, resourceIds: string[]): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/permission/setResource', {
      permissionId,
      resourceIdList: resourceIds
    })
  }

  getRoles(queryDto: PermissionRoleQueryDto): Observable<ResponseBean<PermissionRoleVo[]>> {
    return this.http.get<ResponseBean<PermissionRoleVo[]>>('/api/permission/findPermissionRoles', {
      params: {
        ...queryDto
      }
    })
  }
}
