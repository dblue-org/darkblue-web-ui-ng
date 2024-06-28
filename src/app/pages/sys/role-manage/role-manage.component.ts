import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '@site/app/define/sys/role';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { TplSearchBarComponent } from '@site/app/components/layout/tpl-search-bar/tpl-search-bar.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { RoleService } from '@site/app/services/sys/role.service';
import { RoleEditModalComponent } from '@site/app/pages/sys/role-manage/role-edit-modal/role-edit-modal.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  PermissionsSetModalComponent
} from '@site/app/pages/sys/role-manage/permissions-set-modal/permissions-set-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-manage',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    FormsModule,
    NzInputDirective,
    ReactiveFormsModule,
    TplSearchBarComponent,
    NzButtonComponent,
    NzIconDirective,
    NzPopconfirmDirective,
    NzWaveDirective,
    RoleEditModalComponent,
    PermissionsSetModalComponent
  ],
  templateUrl: './role-manage.component.html',
  styleUrl: './role-manage.component.css'
})
export class RoleManageComponent implements OnInit {

  @ViewChild('roleEditModalComponent') roleEditModalComponent!: RoleEditModalComponent;
  @ViewChild('permissionsSetModalComponent') permissionsSetModalComponent!: PermissionsSetModalComponent;

  searchForm = this.fb.group({
    roleName: [''],
    roleCode: ['']
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
        this.messageService.success("角色已删除")
        this.loadRoles();
      }
    })
  }

  disable(role: Role) {
    this.stateLoading = true;
    this.roleService.disable(role.roleId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success("角色已禁用")
          role.isEnable = false;
        }
      },
      complete: () => this.stateLoading = false
    })
  }

  enable(role: Role) {
    this.stateLoading = true;
    this.roleService.enable(role.roleId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success("角色已启用")
          role.isEnable = true;
        }
      },
      complete: () => this.stateLoading = false
    })
  }

  showPermissionSetModal(roleId: string) {
    this.permissionsSetModalComponent.showModal(roleId);
  }

  goDetails(role: Role) {
    this.router.navigate(['/sys/role/details'], {
      queryParams: {
        roleId: role.roleId
      }
    })
  }

}
