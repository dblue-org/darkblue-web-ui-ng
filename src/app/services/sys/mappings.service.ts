import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/response';
import { Controller } from '@site/app/define/resource';

@Injectable({
  providedIn: 'root'
})
export class MappingsService {

  constructor() { }

  getAll(): Observable<ResponseBean<Controller[]>> {
    return of({
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
    }).pipe(delay(1000))
  }
}
