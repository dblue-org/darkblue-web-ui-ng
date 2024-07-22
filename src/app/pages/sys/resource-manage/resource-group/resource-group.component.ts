import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { ResourceGroup } from '@site/app/define/sys/resource';
import { ResourcesGroupService } from '@site/app/services/sys/resources-group.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  ResourceGroupEditModalComponent
} from '@site/app/pages/sys/resource-manage/resource-group-edit-modal/resource-group-edit-modal.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { PermIfDirective } from '@site/app/directives/perm-if.directive';
import { environment } from '@site/environments/environment';

@Component({
  selector: 'app-resource-group',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    NzListModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzRadioModule,

    ResourceGroupEditModalComponent,
    PermIfDirective
  ],
  templateUrl: './resource-group.component.html',
  styleUrl: './resource-group.component.css'
})
export class ResourceGroupComponent implements OnInit {
  @Input() platform = 1;
  @Output() platformChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onSelected = new EventEmitter<ResourceGroup>();
  @ViewChild('resourceGroupEditModalComponent') resourceGroupEditModalComponent?: ResourceGroupEditModalComponent;

  isAllowAppMenu = environment.isAllowAppMenu;

  resourceGroups: ResourceGroup[] = [];
  selected?: ResourceGroup;
  loading = false;

  constructor(
    private resourceGroupService: ResourcesGroupService, private modalService: NzModalService,
    private messageService: NzMessageService) {
  }

  selectResourceGroup(resourceGroup: ResourceGroup) {
    this.selected = resourceGroup;
    this.onSelected.emit(resourceGroup);
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.resourceGroupService.getAll(this.platform).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.resourceGroups = res.data;
          if (this.resourceGroups.length > 0 && this.selected === undefined) {
            this.selectResourceGroup(this.resourceGroups[0])
          }
        }
      },
      complete: () => this.loading = false
    });
  }

  clearSelected(event: MouseEvent) {
    event.stopPropagation();
    this.selected = undefined;
    this.onSelected.emit(undefined);
  }

  showAddModal() {
    this.resourceGroupEditModalComponent?.showAddModal({
      platform: this.platform
    });
  }

  showEditModal() {
    this.resourceGroupEditModalComponent?.showUpdateModal(this.selected);
  }

  doDelete() {
    if (this.selected && this.selected.resourceGroupId) {
      const resourceGroupId = this.selected.resourceGroupId;
      this.modalService.confirm({
        nzTitle: '资源组删除',
        nzContent: '是否确认删除此资源组？请确保资源组下没有资源，否则会删除失败。',
        nzOnOk: () => {
          this.resourceGroupService.delete(resourceGroupId).subscribe(res => {
            if (res.success) {
              this.messageService.success('资源组已删除');
              this.loadAll();
            }
          });
        }
      });
    }
  }

  onPlatformChange() {
    this.loadAll();
    this.platformChange.emit(this.platform);
  }

}
