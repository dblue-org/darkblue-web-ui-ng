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
import { TableOptions } from '@site/app/define/common';
import { RouterLink } from '@angular/router';
import { RefUserVo } from '@site/app/define/sys/user';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RoleMenuTableComponent } from '@site/app/pages/sys/role-manage/role-menu-table/role-menu-table.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import {
  DetailsOperationBarComponent
} from '@site/app/components/layout/details-operation-bar/details-operation-bar.component';
import { PermIfDirective } from '@site/app/directives/perm-if.directive';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

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
    NzGridModule,
    NzSkeletonModule,

    SectionComponent,
    RouterLink,
    RoleMenuTableComponent,
    NzBadgeComponent,
    DetailsOperationBarComponent,
    PermIfDirective
  ],
  templateUrl: './role-details.component.html',
  styleUrl: './role-details.component.css'
})
export class RoleDetailsComponent implements OnInit {

  @Input('roleId') roleId?: string;
  pcMenuPermissions: MenusWithPermission[] = [];
  appMenuPermissions: MenusWithPermission[] = [];
  roleDetailsLoading = false;
  hasAppMenuPermission = false;

  roleDetails?: RoleDetailsVo;

  users: RefUserVo[] = [];
  userTableLoading = false;
  userTableOptions: TableOptions = {
    total: 0,
    page: 1,
    pageSize: 5
  };

  stateLoading = false;

  constructor(private roleService: RoleService, private messageService: NzMessageService) {
  }

  getRole() {
    if (this.roleId) {
      this.hasAppMenuPermission = false;
      this.roleDetailsLoading = true;
      this.roleService.getDetails(this.roleId).subscribe({
        next: res => {
          if (res.success && res.data) {
            this.roleDetails = res.data;
            this.pcMenuPermissions = res.data.pcMenus || [];
            this.appMenuPermissions = res.data.appMenus || [];
            if (this.appMenuPermissions.length > 0) {
              this.hasAppMenuPermission = true;
            }
          }
        },
        complete: () => this.roleDetailsLoading = false
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

  toggleState(isEnable: boolean) {
    if (!this.roleDetails) {
      return;
    }
    this.stateLoading = true;
    this.roleService.toggleState(this.roleDetails.roleId, isEnable).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success(isEnable ? '角色已启用' : '角色已禁用');
          if (this.roleDetails) {
            this.roleDetails.isEnable = isEnable
          }
        }
      },
      complete: () => this.stateLoading = false
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
