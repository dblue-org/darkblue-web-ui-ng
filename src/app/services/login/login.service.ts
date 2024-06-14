import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm, User } from '../../define/user';
import { Observable } from 'rxjs';
import { ResponseBean } from '../../define/response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data: LoginForm): Observable<ResponseBean<User>> {
    return this.http.post<ResponseBean<User>>('/api/login', data, {
      headers: {
        'Content-Type': 'x-www-form-urlencoded'
      }
    });
  }
}
