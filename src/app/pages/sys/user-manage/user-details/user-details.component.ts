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
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RoleMenuTableComponent } from '@site/app/pages/sys/role-manage/role-menu-table/role-menu-table.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import {
  DetailsOperationBarComponent
} from '@site/app/components/layout/details-operation-bar/details-operation-bar.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

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
    NzSkeletonModule,
    NzGridModule,
    NzBadgeModule,

    SectionComponent,
    IconifyComponent,
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

  userDetailsLoading = false;
  stateLoading = false;
  resetPasswordLoading = false;
  hasAppMenuPermission = false;
  pcMenuPermissions: MenusWithPermission[] = [];
  appMenuPermissions: MenusWithPermission[] = [];


  constructor(private userService: UserService, private loginLogService: LoginLogService,
              private messageService: NzMessageService) {
  }

  getUserDetails() {
    if (!this.userId) {
      return;
    }

    this.pcMenuPermissions = [];
    this.appMenuPermissions = [];
    this.userDetailsLoading = true;
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
        this.userDetailsLoading = false;
      },
      error: () => this.userDetailsLoading = false
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

  toggleState(isEnable: boolean) {
    if (!this.userDetails) {
      return;
    }
    this.stateLoading = true;
    this.userService.toggleState(this.userDetails.userId, isEnable).subscribe({
      next: res => {
        if (res.success && this.userDetails) {
          this.userDetails.isEnable = isEnable;
        }
      },
      complete: () => this.stateLoading = false
    });
  }

  resetPassword() {
    if (!this.userDetails) {
      return;
    }
    this.resetPasswordLoading = true;
    this.userService.resetPassword(this.userDetails.userId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('密码已重置');
        }
      },
      complete: () => this.resetPasswordLoading = false
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.getUserDetails();
      this.loadLoginLogs();
    }
  }
}
