import { Injectable } from '@angular/core';
import {
  UserGroupAddDto,
  UserGroupPageListVo, UserGroupRefQueryDto,
  UserGroupSearchForm,
  UserGroupUpdateDto
} from '@site/app/define/sys/user-group';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { Role, RefRoleVo } from '@site/app/define/sys/role';
import { RefUserVo, UserPageListVo } from '@site/app/define/sys/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor(private http: HttpClient) { }

  findByPage(searchParams: UserGroupSearchForm): Observable<ResponseBean<UserGroupPageListVo[]>> {
    return this.http.get<ResponseBean<UserGroupPageListVo[]>>('/api/user/group/page', {
      params: {
        ...searchParams
      }
    })
  }

  get(userGroupId: string): Observable<ResponseBean<UserGroupPageListVo>> {
    return this.http.get<ResponseBean<UserGroupPageListVo>>(`/api/user/group/getOne/${userGroupId}`)
  }

  getRoles(queryDto: UserGroupRefQueryDto): Observable<ResponseBean<RefRoleVo[]>> {
    return this.http.get<ResponseBean<RefRoleVo[]>>('/api/user/group/findUserGroupRoles', {
      params: {
        ...queryDto
      }
    })
  }

  getUsers(queryDto: UserGroupRefQueryDto): Observable<ResponseBean<RefUserVo[]>> {
    return this.http.get<ResponseBean<RefUserVo[]>>('/api/user/group/findUserGroupUsers', {
      params: {
        ...queryDto
      }
    })
  }

  add(userGroup: UserGroupAddDto): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/user/group/add', userGroup);
  }

  update(userGroup: UserGroupUpdateDto): Observable<ResponseBean<void>> {
    return this.http.put<ResponseBean<void>>('/api/user/group/update', userGroup);
  }

  delete(userGroupId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/user/group/delete/${userGroupId}`);
  }

  addRoles(userGroupId: string, roleIdList: string[]): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/user/group/addRole', {
      userGroupId,
      roleIdList
    });
  }

  addUsers(userGroupId: string, userIdList: string[]): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/user/group/addUser', {
      userGroupId,
      userIdList
    });
  }

  enable(userGroupId: string): Observable<ResponseBean<void>> {
    return this.http.patch<ResponseBean<void>>('/api/user/group/toggleState', {
      userGroupId,
      isEnable: true
    })
  }

  disable(userGroupId: string): Observable<ResponseBean<void>> {
    return this.http.patch<ResponseBean<void>>('/api/user/group/toggleState', {
      userGroupId,
      isEnable: false
    })
  }

  removeRole(userGroupId: string, roleId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/user/group/deleteRoleRef/${userGroupId}/${roleId}`)
  }

  removeUser(userGroupId: string, userId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/user/group/deleteUserRef/${userGroupId}/${userId}`)
  }
}
