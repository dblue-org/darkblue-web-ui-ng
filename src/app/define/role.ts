export interface Role {
  roleId: string;
  roleCode?: string;
  roleName: string;
  remark?: string;
  isEnable?: boolean;
  isBuiltIn?: boolean;
  permissions?: string[];
}

export interface SimpleRole {
  roleId: string;
  roleCode?: string;
  roleName: string;
}
