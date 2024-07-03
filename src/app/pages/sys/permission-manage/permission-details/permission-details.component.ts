import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { SectionComponent } from '@site/app/components/layout/section/section.component';
import { Resource } from '@site/app/define/sys/resource';
import { Role } from '@site/app/define/sys/role';

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

    SectionComponent
  ],
  templateUrl: './permission-details.component.html',
  styleUrl: './permission-details.component.css'
})
export class PermissionDetailsComponent {
  resources: Resource[] = [];
  roleTableLoading = false;
  roles: Role[] = [];
  roleTableOptions = {
    total: 0,
    pageIndex: 1,
    pageSize: 10
  };


  loadRoles() {

  }
}
