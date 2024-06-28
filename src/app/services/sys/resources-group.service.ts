import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/response';
import { ResourceGroup, ResourceGroupForm } from '@site/app/define/resource';

@Injectable({
  providedIn: 'root'
})
export class ResourcesGroupService {

  constructor() { }

  getAll(): Observable<ResponseBean<ResourceGroup[]>> {
    const resourceGroups : ResourceGroup[] = [
      {resourceGroupId: '111', resourceGroupName: '用户管理', createTime: '2022-11-11 11:11:11'},
      {resourceGroupId: '222', resourceGroupName: '菜单管理', createTime: '2022-11-11 11:11:11'},
      {resourceGroupId: '333', resourceGroupName: '权限管理', createTime: '2022-11-11 11:11:11'}
    ]
    return of({
      success: true,
      data: resourceGroups
    })
  }

  add(resourceGroup: ResourceGroupForm): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }

  update(resourceGroup: ResourceGroupForm): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }

  delete(resourceGroupId: string): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }
}
