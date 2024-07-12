import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseBean } from '../../define/sys/response';
import {
  Role,
  RolePermissionsDto,
  RoleSearchForm,
  SimpleRole
} from '../../define/sys/role';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { HttpClient } from '@angular/common/http';
import { MenuPermissionsVo, MenusWithPermission, MenuVo, RoleMenuVo } from '@site/app/define/sys/menu';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {
  }

  queryRoles(searchForm: RoleSearchForm): Observable<ResponseBean<Role[]>> {
    return this.http.get<ResponseBean<Role[]>>('/api/role/page', {
      params: {
        ...searchForm
      }
    });
  }


  getRoleMenusWithPermission(roleId: string): Observable<ResponseBean<MenusWithPermission[]>> {
    return of({
      success: true,
      data: [
        {
          menuId: '001',
          menuName: '系统管理',
          children: [
            {
              menuId: '001001',
              menuName: '用户管理',
              permissions: [
                {
                  permissionId: '001001001',
                  permissionCode: 'user_query',
                  permissionName: '查看用户',
                  platform: 1
                }
              ]
            }
          ]
        }
      ]
    });
  }

  getRole(roleId: string): Observable<ResponseBean<Role>> {
    return this.http.get<ResponseBean<Role>>(`/api/role/getOne/${roleId}`);
  }

  getRoles(): Observable<ResponseBean<SimpleRole[]>> {
    return this.http.get<ResponseBean<SimpleRole[]>>(`/api/role/getAllForSelect`);
  }

  add(role: SimpleRole): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/role/add', role);
  }

  update(role: SimpleRole): Observable<ResponseBean<void>> {
    return this.http.put<ResponseBean<void>>('/api/role/update', role);
  }

  enable(roleId: string): Observable<ResponseBean<void>> {
    return this.http.patch<ResponseBean<void>>('/api/role/enable/', {
      roleId,
      enable: true
    });
  }

  disable(roleId: string): Observable<ResponseBean<void>> {
    return this.http.patch<ResponseBean<void>>('/api/role/enable/', {
      roleId,
      enable: false
    });
  }

  delete(roleId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/role/delete/${roleId}`);
  }

  checkMenus(roleId: string): Observable<ResponseBean<RoleMenuVo>> {
    return this.http.get<ResponseBean<RoleMenuVo>>('/api/menu/getMenuCheckBoxTree', {
      params: {roleId}
    });
  }

  checkMenuPermissions(roleId: string, menuIdList: string[]): Observable<ResponseBean<MenuPermissionsVo[]>> {
    return this.http.get<ResponseBean<MenuPermissionsVo[]>>('/api/permission/getPermissionCheckBox', {
      params: {
        roleId,
        menuIdList: menuIdList.join(',')
      }
    })
  }

  updatePermissions(rolePermissions: RolePermissionsDto): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/role/setPermission', rolePermissions);
  }

  toTreeNodes(menus: MenuVo[] | undefined): NzTreeNodeOptions[] {
    if (!menus) {
      return [];
    }

    let nodes: NzTreeNodeOptions[] = [];
    menus.forEach(menu => {
      let node: NzTreeNodeOptions = {
        title: menu.menuName,
        key: menu.menuId,
        isLeaf: !menu.children,
        expanded: true,
        children: this.toTreeNodes(menu.children)
      };
      nodes.push(node);
    });
    return nodes;
  }


  getCheckedMenus(menus: MenuVo[]): string[] {
    const checkedMenuIds: string[] = [];
    const nodes: MenuVo[] = [];
    menus.forEach(vo => nodes.push(vo));

    while (nodes.length > 0) {
      const node = nodes.pop();
      if (node) {
        if (node.children && node.children.length > 0) {
          nodes.push(...node.children);
        }
        if (node.checked) {
          checkedMenuIds.push(node.menuId);
        }
      }
    }
    return checkedMenuIds;
  }


}
