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

    SectionComponent,
    IconifyComponent
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

  rolePermissions: MenusWithPermission[] = [];
  mapOfExpandedData: { [key: string]: MenusWithPermission[] } = {};
  permissionTableLoading = false;


  constructor(private userService: UserService, private loginLogService: LoginLogService) {
  }

  collapse(array: MenusWithPermission[], data: MenusWithPermission, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.menuId === d.menuId)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: MenusWithPermission): MenusWithPermission[] {
    const stack: MenusWithPermission[] = [];
    const array: MenusWithPermission[] = [];
    const hashMap = {};
    stack.push({...root, level: 0, expand: true});

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({...node.children[i], level: node.level! + 1, expand: true, parent: node});
        }
      }
    }

    return array;
  }

  visitNode(node: MenusWithPermission, hashMap: { [key: string]: boolean }, array: MenusWithPermission[]): void {
    if (!hashMap[node.menuId]) {
      hashMap[node.menuId] = true;
      array.push(node);
    }
  }

  getUserDetails() {
    if (!this.userId) {
      return;
    }

    this.rolePermissions = [];
    this.mapOfExpandedData = {}
    this.permissionTableLoading = true;
    this.userService.getDetails(this.userId).subscribe({
      next: res => {
        if (res.success) {
          this.userDetails = res.data;
          if (res.data && res.data.userMenuVoList) {
            this.rolePermissions = res.data.userMenuVoList;
            this.rolePermissions.forEach(item => {
              this.mapOfExpandedData[item.menuId] = this.convertTreeToList(item);
            });
          }
        }
        this.permissionTableLoading = false
      },
      error: () => this.permissionTableLoading = false
    })
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
    })
  }

  ngOnInit(): void {
    if (this.userId) {
      this.getUserDetails();
      this.loadLoginLogs();
    }
  }
}
