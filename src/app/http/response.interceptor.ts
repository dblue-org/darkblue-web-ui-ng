import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ResponseBean } from '../define/response';
import { NzMessageService } from 'ng-zorro-antd/message';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const msgService = inject(NzMessageService);

  return next(req).pipe(
    tap(res => {
      if (res instanceof HttpResponse) {
        const body = res.body as ResponseBean<any>;
        if (body) {
          if (!body.success) {
            onError(body, router, msgService);
          }
        }
      }
    })
  );
};

function onError(responseBean: ResponseBean<any>, router: Router, msgService: NzMessageService) {
  if (responseBean.errorCode == '403') {
    router.navigate(['/login']);
  } else if (responseBean.message) {
    msgService.error(responseBean.message);
  }
}
