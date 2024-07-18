import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBean } from '../../define/sys/response';
import {
  SimpleUser,
  UserAddDto,
  UserDetailsVo,
  UserPageListVo,
  UserSearchForm,
  UserUpdateDto
} from '../../define/sys/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user: UserAddDto): Observable<ResponseBean<any>> {
    return this.http.post<ResponseBean<any>>('/api/user/add', user);
  }

  updateUser(user: UserUpdateDto): Observable<ResponseBean<any>> {
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

  findByPage(searchForm: UserSearchForm): Observable<ResponseBean<UserPageListVo[]>> {
    return this.http.get<ResponseBean<UserPageListVo[]>>('/api/user/page', {
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
    return this.http.get<ResponseBean<UserDetailsVo>>(`/api/user/getOne/${userId}`);
  }

}
