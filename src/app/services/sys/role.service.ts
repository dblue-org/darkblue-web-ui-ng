import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBean } from '../../define/sys/response';
import {
  Role,
  RoleDetailsVo,
  RolePermissionsDto,
  RoleSearchForm,
  RoleUserQueryDto,
  SimpleRole
} from '../../define/sys/role';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { HttpClient } from '@angular/common/http';
import { MenuPermissionsVo, MenuVo, RoleMenuVo } from '@site/app/define/sys/menu';
import { RefUserVo } from '@site/app/define/sys/user';

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

  getRole(roleId: string): Observable<ResponseBean<RoleDetailsVo>> {
    return this.http.get<ResponseBean<RoleDetailsVo>>(`/api/role/getOne/${roleId}`);
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

  toggleState(roleId: string, isEnable: boolean): Observable<ResponseBean<void>> {
    return this.http.patch<ResponseBean<void>>('/api/role/enable', {
      roleId,
      enable: isEnable
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
    });
  }

  updatePermissions(rolePermissions: RolePermissionsDto): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/role/setPermission', rolePermissions);
  }

  findRefUsers(queryDto: RoleUserQueryDto): Observable<ResponseBean<RefUserVo[]>> {
    return this.http.get<ResponseBean<RefUserVo[]>>('/api/role/findRefUsers', {
      params: {
        ...queryDto
      }
    });
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
