import { Component, Input, TemplateRef } from '@angular/core';
import { BasicTreeTable } from '@site/app/components/basic-tree-table';
import { MenusWithPermission } from '@site/app/define/sys/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-role-menu-table',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzTagModule,
    NzIconModule
  ],
  templateUrl: './role-menu-table.component.html',
  styleUrl: './role-menu-table.component.css'
})
export class RoleMenuTableComponent extends BasicTreeTable<MenusWithPermission> {

  @Input('dkLoading')
  loading = false;

  @Input('dkTitle')
  tableHeader: string | TemplateRef<any> = '';

  roleMenus: MenusWithPermission[] = [];

  @Input('dkRoleMenus')
  set menus(menus: MenusWithPermission[]) {
    this.roleMenus = menus;
    menus.forEach(item => {
      this.mapOfExpandedData[item.menuId] = this.convertTreeToList(item);
    })
  }


  constructor() {
    super();
  }

  getKeyName(): string {
    return 'menuId';
  }
}
