import { CheckedPermissionVo, SimplePermission } from '@site/app/define/sys/permission';
import { BasicTreeTableItem } from '@site/app/components/basic-tree-table';

export interface MenuItem extends BasicTreeTableItem{
  menuId: string;
  parentId?: string;
  platform?: number;
  menuType?: number;
  menuName: string;
  menuUrl?: string;
  sortNum?: number;
  isEnable?: boolean;
  isVisible?: boolean;
  isProductionVisible?: boolean;
  menuIcon: string;
}

export interface MenuItemDto {
  menuId: string;
  parentId?: string;
  platform: number;
  menuType: number;
  menuName: string;
  menuUrl?: string;
  sortNum?: number;
  menuIcon?: string;
  remark?: string;
  isVisible?: boolean;
  isProductionVisible?: boolean;
}

export interface MenuVo {
  menuId: string;
  menuName: string;
  parentId?: string;
  level?: number;
  checked?: boolean;
  children?: MenuVo[]
}

export interface RoleMenuVo {
  pcMenus: MenuVo[]
  appMenus: MenuVo[]
}

export interface MenuPermissionsVo {
  menuId: string;
  menuName: string;
  platform: number;
  permissions: CheckedPermissionVo[]
}

export interface MenusWithPermission extends BasicTreeTableItem{
  menuId: string;
  menuName: string;
  parentId?: string;
  menuIcon?: string;
  menuType?: number;
  checked?: boolean;
  permissions?: SimplePermission[]
}
