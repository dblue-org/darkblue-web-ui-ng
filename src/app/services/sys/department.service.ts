import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Department, DepartmentNode } from '../../define/sys/user';
import { ResponseBean } from '../../define/sys/response';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  getDepartments(): Observable<ResponseBean<DepartmentNode[]>> {
    return of({
      success: true,
      data: this.mock()
    })
  }

  get(deptId: string): Observable<ResponseBean<Department>> {
    return of({
      success: true,
      data: {
        deptId: '001',
        deptName: '研发部',
        /*parentId: '001',*/
        masterUserId: '000001'
      }
    })
  }

  add(department: Department): Observable<ResponseBean<void>> {
    return of({
      success: true,
    })
  }

  update(department: Department): Observable<ResponseBean<void>> {
    return of({
      success: true,
    })
  }

  delete(deptId: string): Observable<ResponseBean<void>> {
    return of({
      success: true,
    })
  }

  private mock():DepartmentNode[] {
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

  toTreeNodes(departments: DepartmentNode[] | undefined, disableDepartment?: string): NzTreeNodeOptions[] {
    if (!departments) {
      return [];
    }

    let nodes: NzTreeNodeOptions[] = [];
    departments.forEach(dept => {
      if (dept.deptId !== disableDepartment) {
        let node: NzTreeNodeOptions = {
          title: dept.deptName,
          key: dept.deptId,
          isLeaf: !dept.children,
          selectable: dept.deptId !== disableDepartment ,
          disabled: dept.deptId == disableDepartment ,
          children: this.toTreeNodes(dept.children, disableDepartment)
        };
        nodes.push(node);
      }
    });
    return nodes;
  }
}
