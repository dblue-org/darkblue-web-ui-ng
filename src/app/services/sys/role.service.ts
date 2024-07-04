import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '../../define/sys/response';
import {
  MenuPermissionsVo,
  MenuVo,
  Role,
  RoleMenusWithPermission,
  RolePermissionsDto,
  RoleSearchForm,
  SimpleRole
} from '../../define/sys/role';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  queryRoles(searchForm: RoleSearchForm): Observable<ResponseBean<Role[]>> {
    return this.http.get<ResponseBean<Role[]>>('/api/role/page', {
      params: {
        ...searchForm
      }
    })
  }

  getRoleMenusWithPermission(roleId: string): Observable<ResponseBean<RoleMenusWithPermission[]>> {
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
                  permissionName: '查看用户'
                }
              ]
            }
          ]
        }
      ]
    })
  }

  getRole(roleId: string): Observable<ResponseBean<Role>> {
    return this.http.get<ResponseBean<Role>>(`/api/role/getOne/${roleId}`)
  }

  getRoles():Observable<ResponseBean<SimpleRole[]>> {
    return of({
      success: true,
      data: this.mockRoles()
    }).pipe(delay(1000))
  }

  add(role: SimpleRole): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/role/add', role)
  }

  update(role: SimpleRole): Observable<ResponseBean<void>> {
    return this.http.put<ResponseBean<void>>('/api/role/update', role)
  }

  enable(roleId: string): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  disable(roleId: string): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  delete(roleId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/role/delete/${roleId}`)
  }

  checkMenus(roleId: string): Observable<ResponseBean<MenuVo[]>> {
    return of({
      success: true,
      data: [
        ...this.mockMenu()
      ]
    })
  }

  checkMenuPermissions(roleId: string, menuIdList: string[]): Observable<ResponseBean<MenuPermissionsVo[]>> {
    return of({
      success: true,
      data: [
        {
          menuId: '00000101',
          menuName: '用户管理',
          permissions: [
            {
              permissionId: '123',
              permissionCode: 'USER_ADD',
              permissionName: '添加用户',
              checked: false
            },
            {
              permissionId: '123',
              permissionCode: 'USER_QUERY',
              permissionName: '查询用户',
              checked: true
            }
          ]
        }
      ]
    })
  }

  updatePermissions(rolePermissions: RolePermissionsDto): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  private mockRoles(): SimpleRole[] {
    return [
      {roleId: '001', roleCode: 'R1', roleName: '角色1'},
      {roleId: '002', roleCode: 'R2', roleName: '角色2'},
    ]
  }


  private mockMenu(): MenuVo[] {
    return [
      {
        menuId: '000001',
        menuName: '系统管理',
        level: 1,
        checked: false,
        children: [
          {
            menuId: '00000101',
            menuName: '用户管理',
            level: 2,
            checked: true,
          },
          {
            menuId: '00000102',
            menuName: '角色管理',
            level: 2,
          },
          {
            menuId: '00000103',
            menuName: '菜单管理',
            level: 2,
          }
        ]
      },
      {
        menuId: '000003',
        menuName: '系统配置',
        level: 1,
        children: [
          {
            menuId: '00000301',
            menuName: '配置参数管理',
          },
          {
            menuId: '00000302',
            menuName: '字典管理',
          },
        ]
      }
    ]
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

    while(nodes.length > 0) {
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
