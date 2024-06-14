import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBean } from '../../define/response';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) { }

  logout() {
    this.http.get<ResponseBean<void>>('/api/logout').subscribe(res => {
      if (res.success) {
        this.authService.deleteSession();
        this.router.navigate(['/login']);
      }
    })
  }
}
