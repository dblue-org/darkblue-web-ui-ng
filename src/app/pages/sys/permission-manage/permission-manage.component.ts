import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { TwoColumnComponent } from '@site/app/components/layout/two-column/two-column.component';
import { TwoColumnSiderDirective } from '@site/app/components/layout/two-column/two-column-sider.directive';
import { NzCardModule } from 'ng-zorro-antd/card';
import { TplSearchBarComponent } from '@site/app/components/layout/tpl-search-bar/tpl-search-bar.component';
import { NzFormatEmitEvent, NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { MenuService } from '@site/app/services/sys/menu.service';
import { toNzTreeNodeOptions } from '@site/utils/nz-tree-node-utils';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PermissionVo } from '@site/app/define/sys/permission';
import { PermissionService } from '@site/app/services/sys/permission.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';

import {
  PermissionEditModalComponent
} from '@site/app/pages/sys/permission-manage/permission-edit-modal/permission-edit-modal.component';
import {
  BindResourceModalComponent
} from '@site/app/pages/sys/permission-manage/bind-resource-modal/bind-resource-modal.component';


import { MenuIconComponent } from '@site/app/components/icon/menu-icon/menu-icon.component';

@Component({
  selector: 'app-permission-manage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,

    NzCardModule,
    NzTreeModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzPopconfirmModule,

    TwoColumnComponent,
    TwoColumnSiderDirective,
    TplSearchBarComponent,
    PermissionEditModalComponent,
    BindResourceModalComponent,
    NzRadioComponent,
    NzRadioGroupComponent,
    MenuIconComponent
  ],
  templateUrl: './permission-manage.component.html',
  styleUrl: './permission-manage.component.css'
})
export class PermissionManageComponent implements OnInit {

  @ViewChild('permissionEditModalComponent') permissionEditModalComponent?: PermissionEditModalComponent;
  @ViewChild('bindResourceModalComponent') bindResourceModalComponent?: BindResourceModalComponent;

  menus: NzTreeNodeOptions[] = [];
  selectedMenu?: { menuId: string, menuName: string };
  menuLoading = false;
  platform = 1;

  searchForm = this.formBuilder.group({
    permissionCode: [''],
    permissionName: ['']
  });

  permissions: PermissionVo[] = [];
  tableOptions = {
    total: 0,
    pageIndex: 1,
    pageSize: 15
  };
  tableLoading = false;

  deleteLoading = false;

  constructor(
    private menuService: MenuService, private formBuilder: NonNullableFormBuilder,
    private permissionService: PermissionService, private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.loadMenus();
  }

  onTreeNodeClick(event: NzFormatEmitEvent) {
    if (event.keys) {
      this.selectedMenu = {
        menuId: event.keys[0],
        menuName: event.node?.title || ''
      };
    }
  }

  showAddModal() {
    this.permissionEditModalComponent?.showAddModal(this.selectedMenu)
  }

  showUpdateModal(permission: PermissionVo) {
    this.permissionEditModalComponent?.showUpdateModal(permission)
  }

  showBindResourceModal(permission: PermissionVo) {
    this.bindResourceModalComponent?.showModal(permission)
  }

  doDelete(permissionId: string) {
    this.deleteLoading = true;
    this.permissionService.delete(permissionId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('已删除')
          this.loadPermissions();
        }
      },
      complete: () => this.deleteLoading = false
    })
  }

  loadPermissions() {
    this.tableLoading = true;

    this.permissionService.findByPage({
      ...this.searchForm.value,
      platform: this.platform,
      menuId: this.selectedMenu?.menuId || '',
      page: this.tableOptions.pageIndex,
      pageSize: this.tableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success) {
          this.permissions = res.data || [];
          this.tableOptions.total = res.total || 0;
        }
      },
      complete: () => this.tableLoading = false
    });
  }

  protected loadMenus() {
    this.menuLoading = true;
    this.menuService.getAllMenu(this.platform).subscribe({
      next: res => {
        if (res.success) {
          this.menus = toNzTreeNodeOptions(res.data || [], menu => {
            return {
              title: menu.menuName,
              key: menu.menuId,
              icon: menu.menuIcon,
              selectable: menu.menuType === 2,
              expanded: true
            };
          });
          this.selectedMenu = undefined;
          this.loadPermissions();
        }
      },
      complete: () => this.menuLoading = false
    });
  }

}
