import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CheckedMapping, Controller, ResourceBatchAddDto, ResourceGroup } from '@site/app/define/sys/resource';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { MappingsService } from '@site/app/services/sys/mappings.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ResourcesService } from '@site/app/services/sys/resources.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-resource-batch-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzTreeModule,
    NzSelectModule,
    NzTableModule,
    NzSwitchModule
  ],
  templateUrl: './resource-batch-add.component.html',
  styleUrl: './resource-batch-add.component.css'
})
export class ResourceBatchAddComponent implements OnInit {

  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();

  isVisible = false;

  resourceGroup = {
    resourceGroupId: '',
    groupName: '',
    platform: 1
  };
  loading = false;
  controllers: Controller[] = [];
  selectedCtl: Controller | undefined;
  mappings: CheckedMapping[] = [];
  checked = false;
  indeterminate = false;

  private mappingService = inject(MappingsService);
  private resourceService = inject(ResourcesService);
  private messageService = inject(NzMessageService);

  constructor() {
  }

  showModal(resourceGroup: ResourceGroup): void {
    this.resourceGroup.resourceGroupId = resourceGroup.resourceGroupId;
    this.resourceGroup.groupName = resourceGroup.groupName;
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    const data: ResourceBatchAddDto = {
      resourceGroupId: this.resourceGroup.resourceGroupId,
      platform: this.resourceGroup.platform,
      mappings: this.mappings.filter(o => o.checked)
    };

    if (data.mappings.length === 0) {
      this.messageService.warning('请选择要添加的资源');
      return;
    }

    this.loading = true;
    this.resourceService.batchAdd(data).subscribe({
      next: res => {
        if (res.success) {
          this.onSuccess.emit();
          this.messageService.success('添加成功');
          this.isVisible = false;
        }
      },
      complete: () => this.loading = false
    });
  }

  ngOnInit(): void {
    this.mappingService.getAll().subscribe(res => {
      if (res.success && res.data) {
        this.controllers = res.data || [];
      }
    });
  }

  updateCheckedSet(data: CheckedMapping, checked: boolean): void {
    data.checked = checked;
  }

  onSelectChange(controller: Controller): void {
    this.mappings = controller.mappings.map(o => {
      return {
        ...o,
        checked: false,
        isAuthedAccess: false
      };
    });
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.mappings.every(({checked}) => checked);
    this.indeterminate = this.mappings.some(({checked}) => checked) && !this.checked;
  }

  onItemChecked(data: CheckedMapping, checked: boolean): void {
    this.updateCheckedSet(data, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.mappings.forEach(o => {
      o.checked = checked;
    });
    this.refreshCheckedStatus();
  }

}
