import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { LoginLog, LoginLogSearchForm } from '@site/app/define/logs/login-log';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginLogService {

  constructor(private http: HttpClient) { }

  getLoginLogs(searchForm: LoginLogSearchForm): Observable<ResponseBean<LoginLog[]>> {
    return this.http.get<ResponseBean<LoginLog[]>>('/api/login-log/findByPage', {
      params: {
        ...searchForm
      }
    })
  }
}
