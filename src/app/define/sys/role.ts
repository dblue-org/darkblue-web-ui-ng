import { MenusWithPermission, MenuVo } from '@site/app/define/sys/menu';
import { PageParams } from '@site/app/define/common';

export interface SimpleRole {
  roleId: string;
  roleCode: string;
  roleName: string;
}

export interface Role extends SimpleRole {
  remark?: string;
  isEnable?: boolean;
  isBuiltIn?: boolean;
  createTime?: string;
  permissions?: string[];
}

export interface RefRoleVo extends SimpleRole {
  remark?: string;
  isEnable?: boolean;
  isBuiltIn?: boolean;
  createTime?: string;
}

export interface PermissionRoleVo extends SimpleRole{
  remark?: string;
  isEnable?: boolean;
  isBuiltIn?: boolean;
  createTime?: string;
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

export interface RoleDetailsVo extends SimpleRole {
  remark?: string;
  isEnable: boolean;
  isBuiltIn: boolean;
  createTime: string;
  pcMenus: MenusWithPermission[];
  appMenus: MenusWithPermission[];
}

export interface RoleUserQueryDto extends PageParams {
  roleId: string;
}

