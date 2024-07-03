import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, DepartmentNode } from '../../define/sys/user';
import { ResponseBean } from '../../define/sys/response';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<ResponseBean<DepartmentNode[]>> {
    return this.http.get<ResponseBean<DepartmentNode[]>>('/api/department/getAll');
  }

  get(deptId: string): Observable<ResponseBean<Department>> {
    return this.http.get<ResponseBean<Department>>(`/api/department/getOne/${deptId}`);
  }

  add(department: Department): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/department/add', department);
  }

  update(department: Department): Observable<ResponseBean<void>> {
    return this.http.put<ResponseBean<void>>('/api/department/update', department);
  }

  delete(deptId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/department/delete/${deptId}`);
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
