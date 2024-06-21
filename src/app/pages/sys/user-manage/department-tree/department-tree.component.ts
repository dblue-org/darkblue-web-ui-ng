import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { DepartmentService } from '@site/app/services/dept/department.service';
import { environment } from '@site/environments/environment';
import {
  DepartmentEditModalComponent
} from '@site/app/pages/sys/user-manage/department-tree/department-edit-modal/department-edit-modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-department-tree',
  standalone: true,
  imports: [
    NgIf,
    NzButtonComponent,
    NzCardComponent,
    NzIconDirective,
    NzTreeComponent,
    NzWaveDirective,
    DepartmentEditModalComponent
  ],
  templateUrl: './department-tree.component.html',
  styleUrl: './department-tree.component.css'
})
export class DepartmentTreeComponent implements OnInit {
  departments: NzTreeNodeOptions[] = [];
  selectedDepartment!: NzTreeNode;
  @Output() onSelect = new EventEmitter<NzTreeNode>();
  @ViewChild('editModalComponent') editModalComponent!: DepartmentEditModalComponent;

  constructor(private departmentService: DepartmentService, private modalService: NzModalService,
              private messageService: NzMessageService) {

  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(res => {
      if (res.success) {
        this.departments = [{
          title: environment.rootDepartmentName || '全公司',
          key: '',
          isLeft: false,
          children: this.departmentService.toTreeNodes(res.data)
        }];
      }
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
      this.onSelect.emit(this.selectedDepartment);
    }
  }

}
