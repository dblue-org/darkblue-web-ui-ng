import { ResourceVo } from '@site/app/define/sys/resource';
import { PageParams } from '@site/app/define/common';

export interface Permission {
  permissionId?: string
  menuId?: string;
  permissionCode: string
  permissionName: string
}

export interface SimplePermission {
  permissionId: string
  permissionCode: string
  permissionName: string
  platform: number;
}

export interface PermissionVo {
  menuId: string;
  menuName: string;
  permissionId: string;
  permissionCode: string;
  permissionName: string;
  resourceNum?: number;
  platform: number;
}

export interface CheckedPermissionVo {
  permissionId: string;
  permissionCode?: string;
  permissionName: string;
  checked: boolean;
}

export interface PermissionSearchForm {
  menuId?: string;
  permissionCode?: string;
  permissionName?: string;
  platform?: number;
  page: number;
  pageSize: number;
}

export interface PermissionDetailsVo {
  permissionId: string;
  permissionCode: string;
  permissionName: string;
  platform: number;
  createTime: string;
  permissionResourceList: ResourceVo[];
}

export interface PermissionRoleQueryDto extends PageParams {
  permissionId: string;
}
