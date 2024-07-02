import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (isFullUrl(req.url)) {
    return next(req);
  }
  const accessToken = localStorage.getItem('access_token');
  const newReq = req.clone({
    url: environment.apiUrl + req.url,
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
  });
  return next(newReq);
};

function isFullUrl(url: string) {
  return url.startsWith('http') || url.startsWith('https')
}
