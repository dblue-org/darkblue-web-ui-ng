import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { Controller } from '@site/app/define/sys/resource';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MappingsService {

  constructor(private http: HttpClient) { }

  getAll(platform: number): Observable<ResponseBean<Controller[]>> {
    return this.http.get<ResponseBean<Controller[]>>('/api/resource/getResourceController', {
      params: {
        platform
      }
    });
    /*return of({
      success: true,
      data: [
        {
          controller: 'org.dblue.application.module.user.controller.UserController',
          tagName: '用户管理',
          mappings: [
            {
              resourceName: '添加用户',
              resourceUrl: '/api/user/add',
              requestMethod: 'POST',
              controller: 'org.dblue.application.module.user.controller.UserController',
              method: 'add',
            }
          ]
        }
      ]
    }).pipe(delay(1000))*/
  }
}
