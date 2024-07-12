import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginForm, LoginUser } from '../../define/sys/user';
import { ResponseBean } from '../../define/sys/response';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) { }

  login(data: LoginForm) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const loginData = `username=${data.username}&password=${data.password}&remember=${data.remember}`

    const subject = new Subject<boolean>;

    this.http.post<ResponseBean<LoginUser>>('/api/login', loginData, {
      headers: headers
    }).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.authService.saveUser(res.data);
          this.authService.saveAccessToken(res.data.accessToken.tokenValue);
          subject.next(true);
          this.router.navigate(['/home']);
        } else {
          subject.next(false);
        }
      },
      error: () => subject.next(false)
    });

    return subject;
  }


}
