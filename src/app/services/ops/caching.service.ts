import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { Caching } from '@site/app/define/ops/caching';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CachingService {

  constructor(private http: HttpClient) { }

  getCacheList(): Observable<ResponseBean<Caching[]>> {
    return this.http.get<ResponseBean<Caching[]>>('/api/ops/caching/getCacheList')
  }

  refreshCache(cacheCode: string): Observable<ResponseBean<void>>{
    return this.http.get<ResponseBean<void>>('/api/ops/caching/refreshCache', {
      params: {
        cacheCode
      }
    })
  }
}
