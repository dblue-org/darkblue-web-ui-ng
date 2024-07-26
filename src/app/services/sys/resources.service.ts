import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import {
  Mapping,
  Resource,
  ResourceBatchAddDto,
  ResourceCheckVo,
  ResourceSearchForm
} from '@site/app/define/sys/resource';
import { SimplePermission } from '@site/app/define/sys/permission';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private http: HttpClient) { }

  findByPage(searchForm: ResourceSearchForm): Observable<ResponseBean<Resource[]>> {
    return this.http.get<ResponseBean<Resource[]>>('/api/resource/findByPage', {
      params: {
        ...searchForm
      }
    })
  }

  add(resource: Resource): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/resource/add', resource)
  }

  update(resource: Resource): Observable<ResponseBean<void>> {
    return this.http.put<ResponseBean<void>>('/api/resource/update', resource)
  }

  delete(resourceId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/resource/delete/${resourceId}`)
  }

  saveResourcePermissions(resourceId: string, permissions: SimplePermission[]): Observable<ResponseBean<void>> {
    const params = {
      resourceId,
      permissionIdList: permissions.map(p => p.permissionId)
    };
    return this.http.post<ResponseBean<void>>('/api/resource/setPermission', params);
  }

  batchAdd(batchAddDto: ResourceBatchAddDto): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/resource/batchAdd', batchAddDto);
  }

  checkResource(platform: number): Observable<ResponseBean<ResourceCheckVo[]>> {
    return this.http.put<ResponseBean<ResourceCheckVo[]>>('/api/resource/checkResourceValidity', {
      platform
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
