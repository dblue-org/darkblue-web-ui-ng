import { Component } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDescriptionsComponent, NzDescriptionsItemComponent } from 'ng-zorro-antd/descriptions';
import { SectionComponent } from '@site/app/components/layout/section/section.component';
import { Resource } from '@site/app/define/sys/resource';
import { Role } from '@site/app/define/sys/role';
import { NgForOf, NgIf } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzTagComponent } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-permission-details',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    SectionComponent,
    NgForOf,
    NgIf,
    NzTableModule,
    NzPopconfirmDirective,
    NzTagComponent,
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
  }


  loadRoles() {

  }
}
