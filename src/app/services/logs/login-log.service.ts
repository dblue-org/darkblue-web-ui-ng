import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { LoginLog, LoginLogSearchForm } from '@site/app/define/logs/login-log';

@Injectable({
  providedIn: 'root'
})
export class LoginLogService {

  constructor() { }

  getLoginLogs(searchForm: LoginLogSearchForm): Observable<ResponseBean<LoginLog[]>> {
    return of({
      success: true,
      data: [
        {
          userId: '000000',
          name: '超级管理员',
          loginPlatform: 'PC',
          loginType: '密码登录',
          loginTime: '2024-05-06 12:40:12',
          loginIp: '123.154.155.36',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
        }
      ],
      total: 10
    }).pipe(delay(500))
  }
}
