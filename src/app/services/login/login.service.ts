import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginForm, User } from '../../define/user';
import { ResponseBean } from '../../define/response';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { ACLService } from '@delon/acl';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) { }

  login(data: LoginForm) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const loginData = `username=${data.username}&password=${data.password}&remember=${data.remember}`

    this.http.post<ResponseBean<User>>('/api/login', loginData, {
      headers: headers
    }).subscribe(res => {
      if (res.success && res.data) {
        this.authService.saveUser(res.data);
        this.authService.saveAccessToken(res.data.accessToken.tokenValue);
        this.router.navigate(['/home']);
      }
    });
  }


}
