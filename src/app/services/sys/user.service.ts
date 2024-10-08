import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBean } from '../../define/sys/response';
import {
  SimpleUser,
  SimpleUserVo,
  UserAddDto,
  UserDetailsVo,
  UserPageListVo,
  UserSearchForm,
  UserSelfUpdateDto,
  UserUpdateDto
} from '../../define/sys/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user: UserAddDto): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/user/add', user);
  }

  updateUser(user: UserUpdateDto): Observable<ResponseBean<any>> {
    return this.http.put<ResponseBean<any>>('/api/user/update', user);
  }

  deleteUser(userId: string): Observable<ResponseBean<any>> {
    return this.http.delete<ResponseBean<any>>(`/api/user/delete/${userId}`);
  }

  toggleState(userId: string, isEnable: boolean): Observable<ResponseBean<any>> {
    return this.http.patch<ResponseBean<any>>('/api/user/toggleState', {
      userId,
      enable: isEnable
    });
  }

  findByPage(searchForm: UserSearchForm): Observable<ResponseBean<UserPageListVo[]>> {
    return this.http.get<ResponseBean<UserPageListVo[]>>('/api/user/findByPage', {
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

  getDetails(userId: string): Observable<ResponseBean<UserDetailsVo>> {
    return this.http.get<ResponseBean<UserDetailsVo>>(`/api/user/getDetails/${userId}`);
  }

  resetPassword(userId: string): Observable<ResponseBean<void>> {
    return this.http.patch<ResponseBean<void>>(`/api/user/resetPassword/${userId}`, {});
  }

  changePassword(data: { oldPassword: string, newPassword: string }): Observable<ResponseBean<void>> {
    return this.http.patch<ResponseBean<void>>('/api/user/changePassword', data);
  }

  getMyselfInfo(): Observable<ResponseBean<SimpleUserVo>> {
    return this.http.get<ResponseBean<SimpleUserVo>>('/api/user/getMyselfInfo');
  }

  updateMyselfInfo(user: UserSelfUpdateDto): Observable<ResponseBean<void>> {
    return this.http.patch<ResponseBean<any>>('/api/user/updateMyselfInfo', user);
  }
}
