import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Department } from '../../define/user';
import { ResponseBean } from '../../define/response';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  getDepartments(): Observable<ResponseBean<Department[]>> {
    return of({
      success: true,
      data: this.mock()
    })
  }

  private mock():Department[] {
    return [
      {
        deptId: '001',
        deptName: '研发部',
        children: [
          {
            deptId: '00101',
            deptName: '开发部',
            parentId: '001'
          },
          {
            deptId: '00102',
            deptName: '产品部',
            parentId: '001'
          }
        ]
      },
      {
        deptId: '002',
        deptName: '财务部',
        children: [
          {
            deptId: '00201',
            deptName: '财务一部',
            parentId: '001'
          },
          {
            deptId: '00202',
            deptName: '财务二部',
            parentId: '001'
          }
        ]
      }
    ]
  }
}
