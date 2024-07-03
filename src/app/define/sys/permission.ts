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

}

export interface PermissionVo {
  menuId: string;
  menuName: string;
  permissionId: string;
  permissionCode: string;
  permissionName: string;
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
