import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { SectionComponent } from '@site/app/components/layout/section/section.component';
import { ResourceVo } from '@site/app/define/sys/resource';
import { PermissionRoleVo } from '@site/app/define/sys/role';
import { PermissionService } from '@site/app/services/sys/permission.service';
import { TableOptions } from '@site/app/define/common';
import { PermissionDetailsVo } from '@site/app/define/sys/permission';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {
  DetailsOperationBarComponent
} from '@site/app/components/layout/details-operation-bar/details-operation-bar.component';

@Component({
  selector: 'app-permission-details',
  standalone: true,
  imports: [
    CommonModule,

    NzButtonModule,
    NzDescriptionsModule,
    NzTableModule,
    NzPopconfirmModule,
    NzTagModule,

    SectionComponent,
    NzIconDirective,
    DetailsOperationBarComponent
  ],
  templateUrl: './permission-details.component.html',
  styleUrl: './permission-details.component.css'
})
export class PermissionDetailsComponent implements OnInit {

  @Input() permissionId?: string;

  permission?: PermissionDetailsVo;
  resources: ResourceVo[] = [];
  roleTableLoading = false;
  roles: PermissionRoleVo[] = [];
  roleTableOptions: TableOptions = {
    total: 0,
    page: 1,
    pageSize: 10
  };

  constructor(private permissionService: PermissionService) {
  }


  loadRoles() {
    if (!this.permissionId) {
      return;
    }
    this.roles = [];
    this.roleTableLoading = true;
    this.permissionService.getRoles({
      permissionId: this.permissionId,
      page: this.roleTableOptions.page,
      pageSize: this.roleTableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.roles = res.data
          this.roleTableOptions.total = res.total || 0
        }
      },
      complete: () => this.roleTableLoading = false
    })
  }

  loadPermissionDetails() {
    if (!this.permissionId) {
      return;
    }
    this.permission = undefined;
    this.resources = [];
    this.permissionService.getDetails(this.permissionId).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.permission = res.data
          this.resources = res.data.permissionResourceList
        }
      }
    })
  }

  ngOnInit(): void {
    this.loadPermissionDetails();
    this.loadRoles();
  }
}
