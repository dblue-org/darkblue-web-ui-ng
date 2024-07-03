export interface MenuItem {
  menuId: string;
  parentId?: string;
  platform?: number;
  menuType?: number;
  menuName: string;
  menuUrl?: string;
  level: number;
  sortNum?: number;
  isEnable?: boolean;
  isVisible?: boolean;
  isProductionVisible?: boolean;
  menuIcon: string;
  children?: MenuItem[];
  expand?: boolean;
  parent?: MenuItem;
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
