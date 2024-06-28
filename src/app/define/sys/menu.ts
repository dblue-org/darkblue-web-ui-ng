export interface MenuItem {
  menuId: string;
  parentId?: string;
  menuType?: number;
  menuName: string;
  menuUrl?: string;
  level: number;
  sort?: number;
  isEnable?: boolean;
  isVisible?: boolean;
  isProductionVisible?: boolean;
  menuIcon: string;
  children?: MenuItem[];
  expand?: boolean;
  parent?: MenuItem;
}
