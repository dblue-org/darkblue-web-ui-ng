import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  if (isFullUrl(req.url)) {
    return next(req);
  }
  const accessToken = localStorage.getItem('access_token');
  const newReq = req.clone({
    url: environment.apiUrl + req.url,
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    params: removeEmptyParams(req.params),
    body: removeEmptyField(req.body)
  });
  return next(newReq);
};

function isFullUrl(url: string) {
  return url.startsWith('http') || url.startsWith('https')
}

function removeEmptyParams(params: HttpParams) {
  let newParams = new HttpParams();
  params.keys().forEach(key => {
    const value = params.get(key);
    if (value != null && value != '' && value != undefined) {
      newParams = newParams.set(key, value);
    }
  })
  return newParams;
}

function removeEmptyField(obj: any): any {
  if (obj) {
    Object.keys(obj).forEach(key => {
      if (obj[key] == null || obj[key] == undefined || obj[key] == '') {
        delete obj[key];
      }
    })
    return obj;
  } else {
    return null
  }
}
