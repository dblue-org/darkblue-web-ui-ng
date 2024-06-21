import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseBean } from '../../define/response';
import { SimpleRole } from '../../define/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }


  getRoles():Observable<ResponseBean<SimpleRole[]>> {
    return of({
      success: true,
      data: this.mockRoles()
    })
  }

  private mockRoles(): SimpleRole[] {
    return [
      {roleId: '001', roleName: '角色1'},
      {roleId: '002', roleName: '角色2'},
    ]
  }
}
