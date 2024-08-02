import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { Controller, Mapping } from '@site/app/define/sys/resource';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MappingsService {

  constructor(private http: HttpClient) { }

  getAll(platform: number): Observable<ResponseBean<Controller[]>> {
    return this.http.get<ResponseBean<Controller[]>>('/api/resource/getResourceMappings', {
      params: {
        platform
      }
    });
  }

  getMapping(requestMethod: string, resourceUrl: string): Observable<ResponseBean<Mapping>> {
    return this.http.get<ResponseBean<Mapping>>(`/api/resource/getMapping`, {
      params: {
        requestMethod,
        resourceUrl
      }
    });
  }
}
