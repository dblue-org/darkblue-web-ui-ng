import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ResourceGroupComponent } from '@site/app/pages/sys/resource-manage/resource-group/resource-group.component';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { TplSearchBarComponent } from '@site/app/components/layout/tpl-search-bar/tpl-search-bar.component';
import { Resource, ResourceGroup } from '@site/app/define/sys/resource';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ResourcesService } from '@site/app/services/sys/resources.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {
  ResourceEditModalComponent
} from '@site/app/pages/sys/resource-manage/resource-edit-modal/resource-edit-modal.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SearchBarHelpDirective } from '@site/app/components/layout/tpl-search-bar/search-bar-help.directive';
import {
  ResourcePermissionModalComponent
} from '@site/app/pages/sys/resource-manage/resource-permission-modal/resource-permission-modal.component';
import { BoxContainerComponent } from '@site/app/components/layout/box-container/box-container.component';
import {
  ResourceBatchAddComponent
} from '@site/app/pages/sys/resource-manage/resource-batch-add-modal/resource-batch-add.component';
import { PermIfDirective } from '@site/app/directives/perm-if.directive';

@Component({
  selector: 'app-resource-manage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzGridModule,
    NzListModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzPopconfirmModule,
    NzTagModule,
    NzInputDirective,
    NzSelectModule,
    NzSpinModule,

    ResourceGroupComponent,
    TplSearchBarComponent,
    ResourceEditModalComponent,
    SearchBarHelpDirective,
    ResourcePermissionModalComponent,
    BoxContainerComponent,
    ResourceBatchAddComponent,
    PermIfDirective
  ],
  templateUrl: './resource-manage.component.html',
  styleUrl: './resource-manage.component.css'
})
export class ResourceManageComponent implements OnInit, OnChanges {

  @ViewChild('resourceEditModalComponent') resourceEditModalComponent?: ResourceEditModalComponent;
  @ViewChild('resourcePermissionModalComponent') resourcePermissionModalComponent?: ResourcePermissionModalComponent;
  @ViewChild('resourceBatchAddComponent') resourceBatchAddComponent?: ResourceBatchAddComponent;

  platform = 1;

  selectedResourceGroup?: ResourceGroup;

  searchForm: FormGroup = this.fb.group({
    resourceName: [''],
    resourceUrl: [''],
    controller: [''],
    method: [''],
    isAuthedAccess: ['']
  });

  // table options
  resources: Resource[] = [];
  expandSet = new Set<string>();
  tableLoading = false;
  tableOptions = {
    total: 0,
    pageIndex: 1,
    pageSize: 15
  };

  // operation properties
  deleteLoading = false;

  constructor(
    private fb: NonNullableFormBuilder, private resourceService: ResourcesService,
    private messageService: NzMessageService) {
  }


  ngOnInit(): void {
    this.loadData();
  }


  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  search() {
    this.tableOptions.pageIndex = 1;
    this.loadData();
  }

  loadData() {
    this.tableLoading = true;
    this.resourceService.findByPage({
      ...this.searchForm.value,
      platform: this.platform,
      resourceGroupId: this.selectedResourceGroup?.resourceGroupId || '',
      page: this.tableOptions.pageIndex,
      pageSize: this.tableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success) {
          this.resources = res.data || [];
          this.tableOptions.total = res.total || 0;
        }
      },
      complete: () => this.tableLoading = false
    });
  }

  doDelete(resourceId: string) {
    this.deleteLoading = true;
    this.resourceService.delete(resourceId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('已删除');
        }
      },
      complete: () => this.deleteLoading = false
    });
  }

  onResourceGroupSelect(selected?: ResourceGroup) {
    this.selectedResourceGroup = selected;
    this.tableOptions.pageIndex = 1;
    this.loadData();
  }

  showAddModal() {
    this.resourceEditModalComponent?.showAddModal(
      {
        ...this.selectedResourceGroup,
        platform: this.platform
      }
    );
  }

  showBatchAddModal() {
    if (!this.selectedResourceGroup) {
      return;
    }
    this.resourceBatchAddComponent?.showModal({
      ...this.selectedResourceGroup,
      platform: this.platform
    });
  }
  showUpdateModal(resource: Resource) {
    this.resourceEditModalComponent?.showUpdateModal({
      ...resource,
      platform: this.platform
    });
  }

  showPermissionsModal(resource: Resource) {
    this.resourcePermissionModalComponent?.showModal(resource);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['platform']) {
      this.loadData();
    }
  }
}
