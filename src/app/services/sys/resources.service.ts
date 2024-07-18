import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { Resource, ResourceBatchAddDto, ResourceSearchForm } from '@site/app/define/sys/resource';
import { SimplePermission } from '@site/app/define/sys/permission';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private http: HttpClient) { }

  findByPage(searchForm: ResourceSearchForm): Observable<ResponseBean<Resource[]>> {
    return this.http.get<ResponseBean<Resource[]>>('/api/resource/page', {
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
}
