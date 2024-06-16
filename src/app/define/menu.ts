export interface MenuItem {
  menuId: string;
  parentId?: string;
  menuType?: number;
  menuName: string;
  menuUrl?: string;
  level?: number;
  menuIcon: string;
  children?: MenuItem[];
  expand?: boolean;
  parent?: MenuItem;
}
