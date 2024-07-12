import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Resource } from '@site/app/define/sys/resource';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PermissionVo, SimplePermission } from '@site/app/define/sys/permission';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TplSearchBarComponent } from '@site/app/components/layout/tpl-search-bar/tpl-search-bar.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PermissionService } from '@site/app/services/sys/permission.service';
import { MenuSelectComponent } from '@site/app/components/form/menu-select/menu-select.component';
import { ResourcesService } from '@site/app/services/sys/resources.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-resource-permission-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzModalModule,
    NzTableModule,
    NzTagModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzIconModule,

    TplSearchBarComponent,
    MenuSelectComponent
  ],
  templateUrl: './resource-permission-modal.component.html',
  styleUrl: './resource-permission-modal.component.css'
})
export class ResourcePermissionModalComponent implements OnInit {

  @Input() platform: number = 1;
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();

  isVisible = false;
  resource?: Resource;

  searchForm: FormGroup = this.fb.group({
    menuId: [''],
    permissionCode: [''],
    permissionName: ['']
  });

  loading = false;

  permissions: PermissionVo[] = [];
  tableLoading = false;
  tableOptions = {
    total: 0,
    pageIndex: 1,
    pageSize: 10
  }

  selectedPermissions: SimplePermission[] = [];

  constructor(
    private fb: NonNullableFormBuilder, private permissionService: PermissionService,
    private resourceService: ResourcesService, private messageService: NzMessageService) {
  }

  ngOnInit(): void {

    this.loadPermissions();
  }

  showModal(resource: Resource) {
    this.resource = resource;
    this.selectedPermissions = resource.permissions ? [...resource.permissions] : [];
    this.isVisible = true;
    console.log(this.platform);
  }

  handleOk(): void {
    this.loading = true;
    if (this.resource) {
      this.resourceService.saveResourcePermissions(this.resource?.resourceId, this.selectedPermissions).subscribe({
        next: res => {
          if (res.success) {
            this.isVisible = false;
            this.onSuccess.emit();
            this.messageService.success('资源访问权限已修改')
          }
        },
        complete: () => this.loading = false
      })
    } else {
      this.isVisible = false;
      this.onSuccess.emit();
    }

  }

  handleCancel(): void {
    this.isVisible = false;
  }

  search() {
    this.tableOptions.pageIndex = 1;
    this.loadPermissions();
  }

  removePermission(item: SimplePermission) {
    this.selectedPermissions = this.selectedPermissions.filter(i => i.permissionId !== item.permissionId);
  }

  isShowAddAction(item: PermissionVo) {
    return !this.selectedPermissions.find(i => i.permissionId === item.permissionId)
  }

  add(item: PermissionVo) {
    this.selectedPermissions.push(item);
  }

  loadPermissions() {
    this.tableLoading = true
    this.permissionService.findByPage({
      ...this.searchForm.value,
      platform: this.platform,
      page: this.tableOptions.pageIndex,
      pageSize: this.tableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success) {
          this.permissions = res.data || []
        }
      },
      complete: () => this.tableLoading = false
    })
  }

}
