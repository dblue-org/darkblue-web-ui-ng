import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseBean } from '../../define/response';
import { SimpleUser, User, UserSearchForm } from '../../define/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(user: User): Observable<ResponseBean<any>> {
    console.log(user);
    return of({
      success: true
    })
  }

  updateUser(user: User): Observable<ResponseBean<any>> {
    console.log(user);
    return of({
      success: true
    })
  }

  deleteUser(userId: string): Observable<ResponseBean<any>> {
    return of({
      success: true
    })
  }

  enable(userId: string): Observable<ResponseBean<any>> {
    return of({
      success: true
    })
  }

  disable(userId: string): Observable<ResponseBean<any>> {
    return of({
      success: true
    })
  }

  findAllUsers(searchForm: UserSearchForm): Observable<ResponseBean<User[]>> {
    console.log(searchForm);
    return of({
      success: true,
      data: this.mockUser(),
      total: 1
    })
  }

  searchUser(keyword?: string, limit: number = 100): Observable<ResponseBean<SimpleUser[]>> {
    console.log('搜索用户：', keyword);
    return of({
      success: true,
      data: this.mockUser(),
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
}
