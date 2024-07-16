import { Component, OnInit, ViewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserGroup, UserGroupPageListVo } from '@site/app/define/sys/user-group';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputDirective, NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmDirective, NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  PermissionsSetModalComponent
} from '@site/app/pages/sys/role-manage/permissions-set-modal/permissions-set-modal.component';
import { RoleEditModalComponent } from '@site/app/pages/sys/role-manage/role-edit-modal/role-edit-modal.component';
import { TplSearchBarComponent } from '@site/app/components/layout/tpl-search-bar/tpl-search-bar.component';
import { UserGroupService } from '@site/app/services/sys/user-group.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterLink } from '@angular/router';
import {
  UserGroupEditModalComponent
} from '@site/app/pages/sys/user-group-manage/user-group-edit-modal/user-group-edit-modal.component';
import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import { BoxContainerComponent } from '@site/app/components/layout/box-container/box-container.component';

@Component({
  selector: 'app-user-group-manage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,

    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzPopconfirmModule,
    NzTableModule,

    PermissionsSetModalComponent,
    RoleEditModalComponent,
    TplSearchBarComponent,
    UserGroupEditModalComponent,
    NzBadgeComponent,
    BoxContainerComponent
  ],
  templateUrl: './user-group-manage.component.html',
  styleUrl: './user-group-manage.component.css'
})
export class UserGroupManageComponent implements OnInit {

  @ViewChild('userGroupEditModalComponent') userGroupEditModalComponent?: UserGroupEditModalComponent;

  searchForm = this.formBuilder.group({
    userGroupName: [''],
  });

  userGroups: UserGroupPageListVo[] = [];
  tableOptions = {
    total: 0,
    pageIndex: 1,
    pageSize: 15
  };
  tableLoading = false;

  deleteLoading = false;

  constructor(
    private formBuilder: NonNullableFormBuilder, private userGroupService: UserGroupService,
    private messageService: NzMessageService) {
  }

  search() {
    this.tableOptions.pageIndex = 1;
    this.loadUserGroups();
  }

  showAddModal() {
    this.userGroupEditModalComponent?.showAddModal();
  }

  showEditModal(userGroup: UserGroupPageListVo) {
    this.userGroupEditModalComponent?.showUpdateModal(userGroup);
  }

  delete(id: string) {
    this.deleteLoading = true;
    this.userGroupService.delete(id).subscribe({
      next: res => {
        if (res.success) {
          this.loadUserGroups();
          this.messageService.success('已删除');
        }
      },
      complete: () => this.deleteLoading = false
    })
  }

  loadUserGroups() {
    this.tableLoading = true;
    this.userGroupService.findByPage({
      ...this.searchForm.value,
      page: this.tableOptions.pageIndex,
      pageSize: this.tableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success) {
          this.userGroups = res.data || [];
          this.tableOptions.total = res.total || 0;
        }
      },
      complete: () => this.tableLoading = false
    })
  }

  ngOnInit(): void {
    this.loadUserGroups();
  }
}
