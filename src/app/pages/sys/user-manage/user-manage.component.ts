import { Component, OnInit, ViewChild } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTreeNode } from 'ng-zorro-antd/tree';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgForOf, NgIf } from '@angular/common';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { TplSearchBarComponent } from '@site/app/components/tpl-search-bar/tpl-search-bar.component';
import { DepartmentTreeComponent } from './department-tree/department-tree.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UserService } from '@site/app/services/sys/user.service';
import { User } from '@site/app/define/user';
import { SimpleRole } from '@site/app/define/role';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { UserAddModalComponent } from './user-add-modal/user-add-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [
    NzGridModule,
    NzTabsModule,
    NzButtonModule,
    NzLayoutModule,
    NzIconModule,
    NgIf,
    NzInputDirective,
    ReactiveFormsModule,
    NzFormDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    TplSearchBarComponent,
    DepartmentTreeComponent,
    NzTableModule,
    NgForOf,
    NzPopconfirmModule,
    UserAddModalComponent
  ],
  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.css'
})
export class UserManageComponent implements OnInit {

  @ViewChild('userAddModalComponent') userAddModalComponent?: UserAddModalComponent;

  selectedDepartment!: NzTreeNode;
  userSearchForm: FormGroup<{
    name: FormControl<string>;
    deptId: FormControl<string>;
    username: FormControl<string>;
    phoneNumber: FormControl<string>;
  }> = this.fb.group({
    name: [''],
    deptId: [''],
    username: [''],
    phoneNumber: ['']
  });
  users: User[] = [];
  tableOptions = {
    total: 0,
    pageIndex: 1,
    pageSize: 15
  }
  tableLoading = false;
  deleteLoading = false;
  stateLoading = false;


  constructor(private fb: NonNullableFormBuilder, private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.tableLoading = true;
    this.userService.findAllUsers({
      ...this.userSearchForm.value,
      page: this.tableOptions.pageIndex,
      pageSize: this.tableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success) {
          this.users = res.data || [];
          this.tableOptions.total = res.total || 0;
        }
      },
      complete: () => this.tableLoading = false
    })
  }

  onTreeNodeSelected(node: NzTreeNode): void {
      this.selectedDepartment = node;
      this.userSearchForm.patchValue({
        deptId: this.selectedDepartment.key
      })
  }

  showAddModal() {
    this.userAddModalComponent?.showAddModal({
      deptId: this.selectedDepartment.key,
      deptName: this.selectedDepartment.title
    })
  }

  showEditModal(user: User) {
    this.userAddModalComponent?.showUpdateModal(user)
  }

  deleteUser(userId: string) {
    this.deleteLoading = true;
    this.userService.deleteUser(userId).subscribe({
      next: res => {
        if (res.success) {
          this.loadUsers();
        }
      },
      complete: () => this.deleteLoading = false
    })
  }

  disable(user: User) {
    this.stateLoading = true;
    this.userService.disable(user.userId).subscribe({
      next:res => {
        if (res.success) {
          user.isEnable = false;
        }
      },
      complete: () => this.stateLoading = false
    })
  }

  enable(user: User) {
    this.stateLoading = true;
    this.userService.enable(user.userId).subscribe({
      next:res => {
        if (res.success) {
          user.isEnable = true;
        }
      },
      complete: () => this.stateLoading = false
    })
  }

  gotoDetails(user: User): void {
    this.router.navigate(['/sys/user/details'], {
      queryParams: {
        userId: user.userId
      }
    }).then()
  }

  search() {
    this.tableOptions.pageIndex = 1;
    this.loadUsers();
  }

  getRolesName(roles?: SimpleRole[]) {
    return roles ? roles.map(r => r.roleName).join(',') : '';
  }
}
