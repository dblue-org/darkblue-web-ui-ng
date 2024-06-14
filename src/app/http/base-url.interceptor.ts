import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import {environment} from '../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('access_token');
  //req.url = environment.apiUrl + req.url;
  const newReq = req.clone({
    url: environment.apiUrl + req.url,
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
  })
  return next(newReq);
};
