import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '../../define/sys/response';
import { LoginLog, SimpleUser, User, UserSearchForm } from '../../define/sys/user';
import { RoleMenusWithPermission } from '@site/app/define/sys/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(user: User): Observable<ResponseBean<any>> {
    console.log(user);
    return of({
      success: true
    }).pipe(delay(1000))
  }

  updateUser(user: User): Observable<ResponseBean<any>> {
    console.log(user);
    return of({
      success: true
    }).pipe(delay(1000))
  }

  deleteUser(userId: string): Observable<ResponseBean<any>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  enable(userId: string): Observable<ResponseBean<any>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  disable(userId: string): Observable<ResponseBean<any>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  findAllUsers(searchForm: UserSearchForm): Observable<ResponseBean<User[]>> {
    console.log(searchForm);
    return of({
      success: true,
      data: this.mockUser(),
      total: 1
    }).pipe(delay(1000))
  }

  searchUser(keyword?: string, limit: number = 100): Observable<ResponseBean<SimpleUser[]>> {
    console.log('搜索用户：', keyword);
    return of({
      success: true,
      data: this.mockUser(),
    }).pipe(delay(500))
  }

  private mockUser(): User[] {
    return [
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
  }

  getMenusWithPermission(userId: string): Observable<ResponseBean<RoleMenusWithPermission[]>> {
    return of({
      success: true,
      data: [
        {
          menuId: '001',
          menuName: '系统管理',
          children: [
            {
              menuId: '001001',
              menuName: '用户管理',
              permissions: [
                {
                  permissionId: '001001001',
                  permissionCode: 'user_query',
                  permissionName: '查看用户'
                }
              ]
            }
          ]
        }
      ]
    }).pipe(delay(1500))
  }

  getLoginLogs(params: {userId: string, page: number, pageSize: number}): Observable<ResponseBean<LoginLog[]>> {
    return of({
      success: true,
      data: [
        {
          platform: 'PC',
          loginType: '密码登录',
          loginTime: '2024-05-06 12:40:12',
          loginIp: '123.154.155.36',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
        }
      ],
      total: 10
    }).pipe(delay(500))
  }
}
