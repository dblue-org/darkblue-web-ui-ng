import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormatEmitEvent, NzTreeModule, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { DepartmentService } from '@site/app/services/sys/department.service';
import { environment } from '@site/environments/environment';
import {
  DepartmentEditModalComponent
} from '@site/app/pages/sys/user-manage/department-tree/department-edit-modal/department-edit-modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { toNzTreeNodeOptions } from '@site/utils/nz-tree-node-utils';
import { PermIfDirective } from '@site/app/directives/perm-if.directive';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-department-tree',
  standalone: true,
  imports: [
    CommonModule,

    NzButtonModule,
    NzCardModule,
    NzIconModule,
    NzTreeModule,
    NzSpinModule,

    DepartmentEditModalComponent,
    PermIfDirective
  ],
  templateUrl: './department-tree.component.html',
  styleUrl: './department-tree.component.css'
})
export class DepartmentTreeComponent implements OnInit {
  departments: NzTreeNodeOptions[] = [];
  selectedDepartment!: NzTreeNode;
  selectedKeys: string[] = [];
  @Output() onSelect = new EventEmitter<NzTreeNode>();
  @ViewChild('editModalComponent') editModalComponent!: DepartmentEditModalComponent;
  loading = false;

  constructor(private departmentService: DepartmentService, private modalService: NzModalService,
              private messageService: NzMessageService) {

  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {

    this.loading = true;
    this.departmentService.getDepartments().subscribe({
      next: res => {
        if (res.success) {
          this.departments = [{
            title: environment.rootDepartmentName || '全公司',
            key: '',
            isLeft: false,
            expanded: true,
            //children: this.departmentService.toTreeNodes(res.data)
            children: toNzTreeNodeOptions(res.data || [], d => {
              return {
                key: d.deptId,
                title: d.deptName
                //selected: this.selectedDepartment != null && this.selectedDepartment.key == d.deptId
              };
            })
          }];
        }
      },
      complete: () => this.loading = false
    });
  }

  showAddModal() {
    this.editModalComponent?.showAddModal(this.selectedDepartment ? this.selectedDepartment.key : '');
  }

  showEditModal(): void {
    if (this.selectedDepartment) {
      this.editModalComponent?.showUpdateModal(this.selectedDepartment.key)
    }
  }

  doDelete() {
    const deptId = this.selectedDepartment.key;
    if (deptId) {
      this.modalService.confirm({
        nzTitle: '部门删除',
        nzContent: '是否确认删除此部门？请确保部门下的人员已全部转移，否则会删除失败。',
        nzOnOk: () => {
          this.departmentService.delete(deptId).subscribe(res => {
            if (res.success) {
              this.messageService.success('部门已删除')
            }
          })
        }
      })
    }
  }

  onTreeNodeSelected(event: NzFormatEmitEvent): void {
    if (event.node) {
      this.selectedDepartment = event.node;
      this.selectedKeys = [event.node.key];
      this.onSelect.emit(this.selectedDepartment);
    }
  }

}
