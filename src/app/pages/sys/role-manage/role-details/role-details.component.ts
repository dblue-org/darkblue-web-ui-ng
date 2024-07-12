import { Component, Input, OnInit } from '@angular/core';
import { SectionComponent } from '@site/app/components/layout/section/section.component';
import { CommonModule } from '@angular/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { RoleDetailsVo } from '@site/app/define/sys/role';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { RoleService } from '@site/app/services/sys/role.service';
import { MenusWithPermission } from '@site/app/define/sys/menu';
import { BasicTreeTable } from '@site/app/components/basic-tree-table';
import { TableOptions } from '@site/app/define/common';
import { RouterLink } from '@angular/router';
import { RefUserVo } from '@site/app/define/sys/user';

@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [
    CommonModule,

    NzDescriptionsModule,
    NzTableModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    NzPopconfirmModule,

    SectionComponent,
    RouterLink
  ],
  templateUrl: './role-details.component.html',
  styleUrl: './role-details.component.css'
})
export class RoleDetailsComponent extends BasicTreeTable<MenusWithPermission> implements OnInit {

  @Input('roleId') roleId?: string;
  rolePermissions: MenusWithPermission[] = [];
  permissionTableLoading = false;

  roleDetails?: RoleDetailsVo;

  users: RefUserVo[] = [];
  userTableLoading = false;
  userTableOptions: TableOptions = {
    total: 0,
    page: 1,
    pageSize: 5
  };

  constructor(private roleService: RoleService) {
    super();
  }

  getRole() {
    if (this.roleId) {
      this.permissionTableLoading = true;
      this.roleService.getRole(this.roleId).subscribe({
        next: res => {
          if (res.success && res.data) {
            this.roleDetails = res.data;
            this.rolePermissions = res.data.roleMenuVoList || [];
            this.rolePermissions.forEach(item => {
              this.mapOfExpandedData[item.menuId] = this.convertTreeToList(item);
            });
          }
        },
        complete: () => this.permissionTableLoading = false
      });
    }
  }

  loadUsers() {
    if (!this.roleId) {
      return;
    }

    this.userTableLoading = true;
    this.roleService.findRefUsers({
      roleId: this.roleId,
      page: this.userTableOptions.page,
      pageSize: this.userTableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.users = res.data || [];
          this.userTableOptions.total = res.total || 0;
        }
      },
      complete: () => this.userTableLoading = false
    });
  }

  ngOnInit(): void {
    if (this.roleId) {
      this.getRole();
      this.loadUsers();
    }
  }

  getKeyName(): string {
    return 'menuId';
  }
}
