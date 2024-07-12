import { Injectable } from '@angular/core';
import {
  UserGroup,
  UserGroupAddDto,
  UserGroupPageListVo,
  UserGroupSearchForm,
  UserGroupUpdateDto
} from '@site/app/define/sys/user-group';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { Role } from '@site/app/define/sys/role';
import { UserPageListVo } from '@site/app/define/sys/user';
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

  getRoles(userGroupId: string): Observable<ResponseBean<Role[]>> {
    return of({
      success: true,
      data: [
        {roleId: '001', roleCode: 'R1', roleName: '角色1', isEnable: true, isBuiltIn: false},
        {roleId: '002', roleCode: 'R2', roleName: '角色2', isEnable: true, isBuiltIn: false},
      ]
    }).pipe(delay(1000))
  }

  getUsers(userGroupId: string): Observable<ResponseBean<UserPageListVo[]>> {
    return of({
      success: true,
      data: [
        {
          userId: '001',
          username: 'zhangsan',
          name: '张三',
          phoneNumber: '13888888888',
          deptId: 'd01',
          deptName: '开发部',
          roles: [{roleId: '0010001', roleCode: 'aaa', roleName: '管理员'}],
          isEnable: true
        }
      ]
    }).pipe(delay(1000))
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
    return this.http.patch<ResponseBean<void>>('/api/user/group/enable', {
      userGroupId,
      isEnable: true
    })
  }

  disable(userGroupId: string): Observable<ResponseBean<void>> {
    return this.http.patch<ResponseBean<void>>('/api/user/group/enable', {
      userGroupId,
      isEnable: false
    })
  }

  removeRole(userGroupId: string, roleId: string): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }

  removeUser(userGroupId: string, userId: string): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }
}
