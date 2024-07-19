import { Component, OnInit, ViewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Position } from '@site/app/define/sys/position';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  PermissionsSetModalComponent
} from '@site/app/pages/sys/role-manage/permissions-set-modal/permissions-set-modal.component';
import { RoleEditModalComponent } from '@site/app/pages/sys/role-manage/role-edit-modal/role-edit-modal.component';
import { TplSearchBarComponent } from '@site/app/components/layout/tpl-search-bar/tpl-search-bar.component';
import { PositionService } from '@site/app/services/sys/position.service';
import { RouterLink } from '@angular/router';
import {
  PositionEditModalComponent
} from '@site/app/pages/sys/position-manage/position-edit-modal/position-edit-modal.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BoxContainerComponent } from '@site/app/components/layout/box-container/box-container.component';
import { PermIfDirective } from '@site/app/directives/perm-if.directive';

@Component({
  selector: 'app-position-manage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzPopconfirmModule,
    NzTableModule,

    PermissionsSetModalComponent,
    RoleEditModalComponent,
    TplSearchBarComponent,
    RouterLink,
    PositionEditModalComponent,
    BoxContainerComponent,
    PermIfDirective
  ],
  templateUrl: './position-manage.component.html',
  styleUrl: './position-manage.component.css'
})
export class PositionManageComponent implements OnInit {

  @ViewChild('positionEditModalComponent') positionEditModalComponent?: PositionEditModalComponent;

  searchForm = this.formBuilder.group({
    positionName: [''],
    positionCode: ['']
  });

  positions: Position[] = [];
  tableOptions = {
    total: 0,
    page: 1,
    pageSize: 15
  };
  tableLoading = false;

  deleteLoading = false;
  stateLoading = false;


  constructor(
    private formBuilder: NonNullableFormBuilder, private positionService: PositionService,
    private messageService: NzMessageService) {

  }

  search() {
    this.tableOptions.page = 1;
    this.loadPositions();
  }

  loadPositions() {
    this.tableLoading = true;
    this.positionService.findByPage({
      ...this.searchForm.value,
      page: this.tableOptions.page,
      pageSize: this.tableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success) {
          this.positions = res.data || [];
          this.tableOptions.total = res.total || 0;
        }
      },
      complete: () => this.tableLoading = false
    })

  }

  showAddModal() {
    this.positionEditModalComponent?.showAddModal();
  }

  showEditModal(position: Position) {
    this.positionEditModalComponent?.showUpdateModal(position);
  }

  delete(positionId: string) {
    this.deleteLoading = true;
    this.positionService.delete(positionId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('职位已删除');
          this.loadPositions();
        }
      },
      complete: () => this.deleteLoading = false
    })
  }

  enable(position: Position) {
    this.stateLoading = true;
    this.positionService.enable(position.positionId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('已启用');
          position.isEnable = true;
        }
      },
      complete: () => this.stateLoading = false
    })
  }

  disable(position: Position) {
    this.stateLoading = true;
    this.positionService.disable(position.positionId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('已禁用');
          position.isEnable = false;
        }
      },
      complete: () => this.stateLoading = false
    })
  }

  ngOnInit(): void {
    this.loadPositions();
  }
}
