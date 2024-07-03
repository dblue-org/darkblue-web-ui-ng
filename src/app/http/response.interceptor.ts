import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ResponseBean } from '../define/sys/response';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from '@site/app/services/auth/authentication.service';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const msgService = inject(NzMessageService);
  const authService = inject(AuthenticationService);

  return next(req).pipe(
    tap(res => {
      if (res instanceof HttpResponse) {
        const body = res.body as ResponseBean<any>;
        if (body) {
          if (!body.success) {
            onError(body, router, msgService, authService);
          }
        }
      }
    })
  );
};

function onError(responseBean: ResponseBean<any>, router: Router, msgService: NzMessageService, authService: AuthenticationService) {
  if (responseBean.errorCode == '401') {
    console.log(11111111);

    authService.deleteSession();
    router.navigate(['/login']);
  } else if (responseBean.message) {
    msgService.error(responseBean.message);
  }
}
