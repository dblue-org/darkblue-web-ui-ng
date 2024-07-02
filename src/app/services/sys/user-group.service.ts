import { Injectable } from '@angular/core';
import { UserGroup, UserGroupSearchForm } from '@site/app/define/sys/user-group';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { Role } from '@site/app/define/sys/role';
import { User } from '@site/app/define/sys/user';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor() { }


  findByPage(searchParams: UserGroupSearchForm): Observable<ResponseBean<UserGroup[]>> {
    return of({
      success: true,
      data: [
        {
          userGroupId: '1111111',
          userGroupName: '高层管理',
          createTime: '2024-07-01 15:45:06'
        },
        {
          userGroupId: '222222',
          userGroupName: '财务人员',
          createTime: '2024-07-01 15:45:06'
        }
      ],
      total: 2
    }).pipe(delay(1000))
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

  getUsers(userGroupId: string): Observable<ResponseBean<User[]>> {
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
          roles: [{roleId: '0010001', roleName: '管理员'}],
          isEnable: true
        }
      ]
    }).pipe(delay(1000))
  }

  add(userGroup: UserGroup): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }

  update(userGroup: UserGroup): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }

  delete(userGroupId: string): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }

  addRoles(userGroupId: string, roleIdList: string[]): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }

  addUsers(userGroupId: string, userIdList: string[]): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
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
