import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SectionComponent } from '@site/app/components/layout/section/section.component';
import { CommonModule } from '@angular/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { IconifyComponent } from '@site/app/components/icon/iconify/iconify.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { RefRoleVo, Role } from '@site/app/define/sys/role';
import { RefUserVo, UserPageListVo } from '@site/app/define/sys/user';
import { UserGroupService } from '@site/app/services/sys/user-group.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { RoleSelectComponent } from '@site/app/components/form/role-select/role-select.component';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { UserSelectComponent } from '@site/app/components/form/user-select/user-select.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { UserGroupPageListVo } from '@site/app/define/sys/user-group';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import {
  DetailsOperationBarComponent
} from '@site/app/components/layout/details-operation-bar/details-operation-bar.component';
import { PermIfDirective } from '@site/app/directives/perm-if.directive';
import { RouterLink } from '@angular/router';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-user-group-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    NzDescriptionsModule,
    NzButtonModule,
    NzTagModule,
    NzTableModule,
    NzModalModule,
    NzIconModule,
    NzPopconfirmDirective,
    NzToolTipModule,
    NzBadgeModule,
    NzSkeletonModule,

    SectionComponent,
    IconifyComponent,
    RoleSelectComponent,
    UserSelectComponent,
    DetailsOperationBarComponent,
    PermIfDirective,
    RouterLink
  ],
  templateUrl: './user-group-details.component.html',
  styleUrl: './user-group-details.component.css'
})
export class UserGroupDetailsComponent implements OnInit {

  // 必定不为空，等于 '' 可以省去后续空校验
  @Input('userGroupId') userGroupId: string = '';

  @ViewChild('roleSelector') roleSelector?: TemplateRef<any>;
  @ViewChild('userSelector') userSelector?: TemplateRef<any>;

  userGroup?: UserGroupPageListVo;
  detailsLoading = false;

  roles: RefRoleVo[] = []
  roleTableLoading = false;
  roleTableOptions = {
    total: 0,
    page: 1,
    pageSize: 10
  }

  users: RefUserVo[] = [];
  userTableLoading = false;
  userTableOptions = {
    total: 0,
    page: 1,
    pageSize: 10
  }

  selectedRoles: string[] = [];
  roleAddLoading = false;

  selectedUsers: string[] = [];
  userAddLoading = false;

  stateLoading = false;

  constructor(
    private userGroupService: UserGroupService, private messageService: NzMessageService,
    private modalService: NzModalService) {
  }

  ngOnInit(): void {
    this.loadDetails();
    this.loadRoles();
    this.loadUsers();
  }

  loadDetails() {
    this.detailsLoading = true;
    this.userGroupService.get(this.userGroupId).subscribe({
      next: res => {
        if (res.success) {
          this.userGroup = res.data;
        }
      },
      complete: () => this.detailsLoading = false
    })
  }

  loadRoles() {
    this.roleTableLoading = true;
    this.userGroupService.getRoles({
      userGroupId: this.userGroupId,
      page: this.roleTableOptions.page,
      pageSize: this.roleTableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success) {
          this.roles = res.data || [];
        }
      },
      complete: () => this.roleTableLoading = false
    })
  }
  loadUsers() {
    this.userTableLoading = true;
    this.userGroupService.getUsers({
      userGroupId: this.userGroupId,
      page: this.userTableOptions.page,
      pageSize: this.userTableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success) {
          this.users = res.data || [];
        }
      },
      complete: () => this.userTableLoading = false
    })
  }

  addRoles() {
    this.modalService.create({
      nzTitle: '选择角色以添加到资源组',
      nzContent: this.roleSelector,
      nzBodyStyle: {minHeight: '150px'},
      nzOnOk: () => this.doAddRoles()
    })
  }

  doAddRoles() {
    if (this.selectedRoles && this.selectedRoles.length > 0) {
      this.roleAddLoading = true;
      this.userGroupService.addRoles(this.userGroupId, this.selectedRoles).subscribe({
        next: res => {
          if (res.success) {
            this.messageService.success('已添加角色');
            this.selectedRoles = [];
            this.loadRoles();
          }
        },
        complete: () => this.roleAddLoading = false
      })
    }
  }

  addUsers() {
    this.modalService.create({
      nzTitle: '选择用户以添加到资源组',
      nzContent: this.userSelector,
      nzBodyStyle: {minHeight: '150px'},
      nzOnOk: () => this.doAddUsers()
    })
  }

  doAddUsers() {
    if (this.selectedUsers && this.selectedUsers.length > 0) {
      this.userAddLoading = true;
      this.userGroupService.addUsers(this.userGroupId, this.selectedUsers).subscribe({
        next: res => {
          if (res.success) {
            this.messageService.success('已添加用户');
            this.selectedUsers = [];
            this.loadUsers();
          }
        },
        complete: () => this.userAddLoading = false
      })
    }
  }

  removeRole(role: Role) {
    this.userGroupService.removeRole(this.userGroupId, role.roleId).subscribe(res => {
      if (res.success) {
        this.messageService.success('已从用户组中移除角色[' + role.roleName + ']');
        this.loadRoles();
      }
    })
  }

  removeUser(user: UserPageListVo) {
    this.userGroupService.removeUser(this.userGroupId, user.userId).subscribe(res => {
      if (res.success) {
        this.messageService.success('已从用户组中移除用户[' + user.name + ']');
        this.loadUsers();
      }
    })
  }

  enable() {
    this.stateLoading = true;
    this.userGroupService.enable(this.userGroupId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('已启用');
          this.loadDetails();
        }
      },
      complete: () => this.stateLoading = false
    })
  }
  disable() {
    this.stateLoading = true;
    this.userGroupService.disable(this.userGroupId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('已禁用');
          this.loadDetails();
        }
      },
      complete: () => this.stateLoading = false
    })
  }
}
