import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '../../define/sys/response';
import { SimpleUser, User, UserSearchForm } from '../../define/sys/user';

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
}
