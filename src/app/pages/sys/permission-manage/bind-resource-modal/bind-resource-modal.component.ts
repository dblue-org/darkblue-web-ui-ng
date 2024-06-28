import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Resource, SimpleResource } from '@site/app/define/sys/resource';
import { ResourcesService } from '@site/app/services/sys/resources.service';
import { PermissionService } from '@site/app/services/sys/permission.service';
import { SimplePermission } from '@site/app/define/sys/permission';
import { MenuSelectComponent } from '@site/app/components/form/menu-select/menu-select.component';
import { CommonModule } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TplSearchBarComponent } from '@site/app/components/layout/tpl-search-bar/tpl-search-bar.component';
import {
  ResourceGroupSelectComponent
} from '@site/app/components/form/resource-group-select/resource-group-select.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-bind-resource-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzButtonComponent,
    NzInputDirective,
    NzModalModule,
    NzTableModule,
    NzIconModule,
    NzStepsModule,
    NzGridModule,

    MenuSelectComponent,
    TplSearchBarComponent,
    ResourceGroupSelectComponent
  ],
  templateUrl: './bind-resource-modal.component.html',
  styleUrl: './bind-resource-modal.component.css'
})
export class BindResourceModalComponent implements OnInit {
  isVisible = false;
  permission?: SimplePermission;
  current = 0;
  title = '设置权限资源 -- 选择资源';
  titles = [
    '设置权限资源 -- 选择资源',
    '设置权限资源 -- 确认资源',
  ]


  searchForm: FormGroup = this.formBuilder.group({
    resourceGroupId: [''],
    resourceName: [''],
    resourceUrl: ['']
  });

  // table options
  checked = false;
  loading = false;
  indeterminate = false;
  resources: Resource[] = [];
  tableLoading = false;
  tableOptions = {
    total: 0,
    pageIndex: 1,
    pageSize: 15
  };

  selectedResources: SimpleResource[] = [];
  selectedResourceMap: Map<String, SimpleResource> = new Map<String, SimpleResource>();
  setOfCheckedId = new Set<string>();

  constructor(
    private formBuilder: NonNullableFormBuilder, private resourceService: ResourcesService,
    private permissionService: PermissionService, private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources() {
    this.tableLoading = true;
    this.resourceService.findByPage(this.searchForm.value).subscribe({
      next: res => {
        if (res.success) {
          this.resources = res.data || [];
          this.tableOptions.total = res.total || 0;
        }
      },
      complete: () => this.tableLoading = false
    });
  }

  showModal(permission: SimplePermission) {
    this.setOfCheckedId.clear();
    this.selectedResourceMap.clear();
    this.permissionService.getResources(permission.permissionId).subscribe(res => {
      if (res.success) {
        (res.data || []).forEach(resource => {
          this.selectedResourceMap.set(resource.resourceId, resource);
          this.setOfCheckedId.add(resource.resourceId);
        })
      }
    });
    this.isVisible = true;
    this.permission = permission;
  }

  onAllChecked(checked: boolean): void {
    this.resources
      .forEach((resource) => this.updateCheckedSet(resource, checked));
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.resources.every(item => this.setOfCheckedId.has(item.resourceId));
    this.indeterminate = this.resources.some(item => this.setOfCheckedId.has(item.resourceId)) && !this.checked;
  }

  updateCheckedSet(resource: Resource | SimpleResource, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(resource.resourceId);
      this.selectedResourceMap.set(resource.resourceId, resource);
    } else {
      this.setOfCheckedId.delete(resource.resourceId);
      this.selectedResourceMap.delete(resource.resourceId);
    }
  }

  getCheckedData(): SimpleResource[] {
    return Array.from(this.selectedResourceMap.values());
  }

  next() {
    this.current = this.current + 1;
    this.title = this.titles[this.current];
  }
  pre() {
    this.current = this.current - 1;
    this.title = this.titles[this.current]
  }

  onItemChecked(resource: Resource | SimpleResource, checked: boolean): void {
    this.updateCheckedSet(resource, checked);
    this.refreshCheckedStatus();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  search() {
    this.tableOptions.pageIndex = 1;
    this.loadResources();
  }

  handleOk(): void {
    this.loading = true;
    if (this.permission) {
      this.permissionService.bindResources(this.permission.permissionId, Array.from(this.setOfCheckedId)).subscribe({
        next: res => {
          if (res.success) {
            this.isVisible = false;
            this.messageService.success('权限关联资源已更新')
          }
        },
        complete: () => this.loading = false
      })
    }

  }

}
