import { CheckedPermissionVo, SimplePermission } from '@site/app/define/sys/permission';

export interface Role {
  roleId: string;
  roleCode?: string;
  roleName: string;
  remark?: string;
  isEnable?: boolean;
  isBuiltIn?: boolean;
  createTime?: string;
  permissions?: string[];
}

export interface SimpleRole {
  roleId: string;
  roleCode?: string;
  roleName: string;
}

export interface RoleSearchForm {
  roleCode?: string;
  roleName?: string;
  page: number;
  pageSize: number;
}

export interface RolePermissionsDto {
  roleId: string;
  menuIdList: string[];
  permissionIdList: string[];
}

export interface MenuVo {
  menuId: string;
  menuName: string;
  parentId?: string;
  level?: number;
  checked?: boolean;
  children?: MenuVo[]
}


export interface MenuPermissionsVo {
  menuId: string;
  menuName: string;
  permissions: CheckedPermissionVo[]
}

export interface RoleMenusWithPermission {
  menuId: string;
  menuName: string;
  parentId?: string;
  menuIcon?: string;
  menuType?: number;
  level?: number;
  checked?: boolean;
  permissions?: SimplePermission[]
  expand?: boolean
  parent?: RoleMenusWithPermission
  children?: RoleMenusWithPermission[]
}
