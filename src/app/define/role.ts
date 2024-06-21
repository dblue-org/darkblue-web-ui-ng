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
