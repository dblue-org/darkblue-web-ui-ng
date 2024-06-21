import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseBean } from '../../define/response';
import { Role, RoleSearchForm, SimpleRole } from '../../define/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  queryRoles(searchForm: RoleSearchForm): Observable<ResponseBean<Role[]>> {
    return of({
      success: true,
      data: this.mockRoles()
    })
  }

  getRoles():Observable<ResponseBean<SimpleRole[]>> {
    return of({
      success: true,
      data: this.mockRoles()
    })
  }

  private mockRoles(): SimpleRole[] {
    return [
      {roleId: '001', roleCode: 'R1', roleName: '角色1'},
      {roleId: '002', roleCode: 'R2', roleName: '角色2'},
    ]
  }
}
