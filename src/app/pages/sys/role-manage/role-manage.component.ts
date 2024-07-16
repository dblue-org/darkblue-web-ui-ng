import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '@site/app/define/sys/role';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TplSearchBarComponent } from '@site/app/components/layout/tpl-search-bar/tpl-search-bar.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { RoleService } from '@site/app/services/sys/role.service';
import { RoleEditModalComponent } from '@site/app/pages/sys/role-manage/role-edit-modal/role-edit-modal.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  PermissionsSetModalComponent
} from '@site/app/pages/sys/role-manage/permissions-set-modal/permissions-set-modal.component';
import { Router } from '@angular/router';
import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import { BoxContainerComponent } from '@site/app/components/layout/box-container/box-container.component';

@Component({
  selector: 'app-role-manage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    NzTableModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule,

    TplSearchBarComponent,
    RoleEditModalComponent,
    PermissionsSetModalComponent,
    NzBadgeComponent,
    BoxContainerComponent
  ],
  templateUrl: './role-manage.component.html',
  styleUrl: './role-manage.component.css'
})
export class RoleManageComponent implements OnInit {

  @ViewChild('roleEditModalComponent') roleEditModalComponent!: RoleEditModalComponent;
  @ViewChild('permissionsSetModalComponent') permissionsSetModalComponent!: PermissionsSetModalComponent;

  searchForm = this.fb.group({
    roleCode: [''],
    roleName: ['']
  });

  roles: Role[] = [];
  tableOptions = {
    total: 0,
    pageIndex: 1,
    pageSize: 15
  };
  tableLoading = false;

  deleteLoading = false;
  stateLoading = false;


  constructor(
    private fb: NonNullableFormBuilder, private roleService: RoleService,
    private messageService: NzMessageService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  search() {
    this.tableOptions.pageIndex = 1;
    this.loadRoles();
  }

  loadRoles() {
    this.tableLoading = true;
    this.roles = [];
    this.roleService.queryRoles({
      ...this.searchForm.value,
      page: this.tableOptions.pageIndex,
      pageSize: this.tableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.roles = res.data;
        }
      },
      complete: () => this.tableLoading = false
    });

  }

  showAddModal() {
    this.roleEditModalComponent.showAddModal();
  }

  showEditModal(role: Role) {
    this.roleEditModalComponent.showUpdateModal(role);
  }

  delete(roleId: string) {
    this.roleService.delete(roleId).subscribe(res => {
      if (res.success) {
        this.messageService.success('角色已删除');
        this.loadRoles();
      }
    });
  }

  toggleState(role: Role, isEnable: boolean) {
    this.stateLoading = true;
    this.roleService.toggleState(role.roleId, isEnable).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success(isEnable ? '角色已启用' : '角色已禁用');
          role.isEnable = isEnable;
        }
      },
      complete: () => this.stateLoading = false
    });
  }

  showPermissionSetModal(roleId: string) {
    this.permissionsSetModalComponent.showModal(roleId);
  }

  goDetails(role: Role) {
    this.router.navigate(['/sys/role/details'], {
      queryParams: {
        roleId: role.roleId
      }
    });
  }

}
