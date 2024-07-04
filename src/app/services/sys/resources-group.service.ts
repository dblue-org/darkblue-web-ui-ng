import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { ResourceGroup, ResourceGroupForm } from '@site/app/define/sys/resource';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourcesGroupService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ResponseBean<ResourceGroup[]>> {
    /*const resourceGroups : ResourceGroup[] = [
      {resourceGroupId: '111', resourceGroupName: '用户管理', createTime: '2022-11-11 11:11:11'},
      {resourceGroupId: '222', resourceGroupName: '菜单管理', createTime: '2022-11-11 11:11:11'},
      {resourceGroupId: '333', resourceGroupName: '权限管理', createTime: '2022-11-11 11:11:11'}
    ]*/
    /*return of({
      success: true,
      data: resourceGroups
    })*/
    return this.http.get<ResponseBean<ResourceGroup[]>>('/api/resource/group/getAll');
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
