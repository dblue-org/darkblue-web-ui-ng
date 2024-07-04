import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '../../define/sys/response';
import { SimpleUser, User, UserSearchForm } from '../../define/sys/user';
import { RoleMenusWithPermission } from '@site/app/define/sys/role';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<ResponseBean<any>> {
    return this.http.post<ResponseBean<any>>('/api/user/add', user);
  }

  updateUser(user: User): Observable<ResponseBean<any>> {
    return this.http.put<ResponseBean<any>>('/api/user/update', user);
  }

  deleteUser(userId: string): Observable<ResponseBean<any>> {
    return this.http.delete<ResponseBean<any>>(`/api/user/delete/${userId}`);
  }

  enable(userId: string): Observable<ResponseBean<any>> {
    return this.http.patch<ResponseBean<any>>('/api/user/enable', {
      userId,
      enable: true
    });
  }

  disable(userId: string): Observable<ResponseBean<any>> {
    return this.http.patch<ResponseBean<any>>('/api/user/enable', {
      userId,
      enable: false
    });
  }

  findAllUsers(searchForm: UserSearchForm): Observable<ResponseBean<User[]>> {
    return this.http.get<ResponseBean<User[]>>('/api/user/page', {
      params: {
        ...searchForm
      }
    });
  }

  searchUser(keyword?: string, limit: number = 100): Observable<ResponseBean<SimpleUser[]>> {
    return this.http.get<ResponseBean<SimpleUser[]>>('/api/user/selectByNameOrUserName', {
      params: {
        name: keyword || '',
        limit
      }
    })
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

}
