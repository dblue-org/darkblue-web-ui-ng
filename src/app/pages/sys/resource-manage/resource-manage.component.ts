import { Component, OnInit, ViewChild } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ResourceGroupComponent } from '@site/app/pages/sys/resource-manage/resource-group/resource-group.component';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { TplSearchBarComponent } from '@site/app/components/tpl-search-bar/tpl-search-bar.component';
import { Resource, ResourceGroup } from '@site/app/define/resource';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ResourcesService } from '@site/app/services/sys/resources.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {
  ResourceEditModalComponent
} from '@site/app/pages/sys/resource-manage/resource-edit-modal/resource-edit-modal.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SearchBarHelpDirective } from '@site/app/components/tpl-search-bar/search-bar-help.directive';

@Component({
  selector: 'app-resource-manage',
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    NzListModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzPopconfirmModule,
    NzTagModule,
    ResourceGroupComponent,
    FormsModule,
    NzInputDirective,
    NzSelectModule,
    NzSpinModule,
    ReactiveFormsModule,
    TplSearchBarComponent,
    ResourceEditModalComponent,
    SearchBarHelpDirective
  ],
  templateUrl: './resource-manage.component.html',
  styleUrl: './resource-manage.component.css'
})
export class ResourceManageComponent implements OnInit {

  @ViewChild('resourceEditModalComponent') resourceEditModalComponent?: ResourceEditModalComponent;
  expandSet = new Set<string>();
  selectedResourceGroup?: ResourceGroup;
  deleteLoading = false;
  resources: any[] = [];
  tableLoading = false;
  tableOptions = {
    total: 0,
    pageIndex: 1,
    pageSize: 15
  }
  searchForm: FormGroup = this.fb.group({
    resourceName: [''],
    resourceUrl: [''],
    controller: [''],
    method: [''],
    isAuthedAccess: [''],
  });

  constructor(private fb: NonNullableFormBuilder, private resourceService: ResourcesService,
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
      resourceGroupId: this.selectedResourceGroup?.resourceGroupId,
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
    })
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
    })
  }

  onResourceGroupSelect(selected?:ResourceGroup) {
    this.selectedResourceGroup = selected;
    this.tableOptions.pageIndex = 1;
    this.loadData();
  }

  showAddModal() {
    this.resourceEditModalComponent?.showAddModal(this.selectedResourceGroup);
  }

  showUpdateModal(item: Resource) {
    this.resourceEditModalComponent?.showUpdateModal({
      ...item
    });
  }
}
