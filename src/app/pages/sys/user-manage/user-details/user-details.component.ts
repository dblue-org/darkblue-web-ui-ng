import { Component, Input, OnInit } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { SectionComponent } from '@site/app/components/layout/section/section.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { UserService } from '@site/app/services/sys/user.service';
import { IconifyComponent } from '@site/app/components/icon/iconify/iconify.component';
import { LoginLog } from '@site/app/define/logs/login-log';
import { LoginLogService } from '@site/app/services/logs/login-log.service';
import { MenusWithPermission } from '@site/app/define/sys/menu';
import { UserDetailsVo } from '@site/app/define/sys/user';
import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { RoleMenuTableComponent } from '@site/app/pages/sys/role-manage/role-menu-table/role-menu-table.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import {
  DetailsOperationBarComponent
} from '@site/app/components/layout/details-operation-bar/details-operation-bar.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,

    NzDescriptionsModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzFlexModule,
    NzToolTipModule,
    NzAlertModule,

    SectionComponent,
    IconifyComponent,
    NzBadgeComponent,
    NzColDirective,
    NzRowDirective,
    RoleMenuTableComponent,
    DetailsOperationBarComponent
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {

  @Input('userId') userId?: string; // inject from router

  userDetails?: UserDetailsVo;

  loginLogs: LoginLog[] = [];
  loginLogTableLoading = false;
  loginLogTableOptions = {
    total: 0,
    pageIndex: 1,
    pageSize: 5
  };

  permissionTableLoading = false;
  stateLoading = false;
  hasAppMenuPermission = false;
  pcMenuPermissions: MenusWithPermission[] = [];
  appMenuPermissions: MenusWithPermission[] = [];


  constructor(private userService: UserService, private loginLogService: LoginLogService) {
  }

  getUserDetails() {
    if (!this.userId) {
      return;
    }

    this.pcMenuPermissions = [];
    this.appMenuPermissions = [];
    this.permissionTableLoading = true;
    this.hasAppMenuPermission = false;
    this.userService.getDetails(this.userId).subscribe({
      next: res => {
        if (res.success) {
          this.userDetails = res.data;
          if (res.data) {
            this.pcMenuPermissions = res.data.pcMenus || [];
            this.appMenuPermissions = res.data.appMenus || [];
            if (this.appMenuPermissions.length > 0) {
              this.hasAppMenuPermission = true;
            }
          }
        }
        this.permissionTableLoading = false;
      },
      error: () => this.permissionTableLoading = false
    });
  }

  loadLoginLogs() {
    this.loginLogTableLoading = true;
    this.loginLogService.getLoginLogs({
      userId: this.userId || '',
      page: this.loginLogTableOptions.pageIndex,
      pageSize: this.loginLogTableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success) {
          this.loginLogs = res.data || [];
          this.loginLogTableOptions.total = res.total || 0;
        }
      },
      complete: () => this.loginLogTableLoading = false
    });
  }

  disable() {
    if (!this.userDetails) {
      return;
    }
    this.stateLoading = true;
    this.userService.disable(this.userDetails.userId).subscribe({
      next: res => {
        if (res.success) {
          if (this.userDetails) {
            this.userDetails.isEnable = false;
          }
        }
      },
      complete: () => this.stateLoading = false
    });
  }

  enable() {
    if (!this.userDetails) {
      return;
    }
    this.stateLoading = true;
    this.userService.enable(this.userDetails.userId).subscribe({
      next: res => {
        if (res.success) {
          if (this.userDetails) {
            this.userDetails.isEnable = true;
          }
        }
      },
      complete: () => this.stateLoading = false
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.getUserDetails();
      this.loadLoginLogs();
    }
  }
}
