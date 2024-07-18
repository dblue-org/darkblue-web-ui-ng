import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { ResourceGroup, ResourceGroupForm } from '@site/app/define/sys/resource';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourcesGroupService {

  constructor(private http: HttpClient) { }

  getAll(platform: number): Observable<ResponseBean<ResourceGroup[]>> {
    return this.http.get<ResponseBean<ResourceGroup[]>>(`/api/resource/group/getAll/${platform}`);
  }

  add(resourceGroup: ResourceGroupForm): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/resource/group/add', resourceGroup)
  }

  update(resourceGroup: ResourceGroupForm): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/resource/group/update', resourceGroup)
  }

  delete(resourceGroupId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/resource/group/delete/${resourceGroupId}`)
  }
}
