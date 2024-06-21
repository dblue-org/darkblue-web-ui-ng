import { Component, OnInit } from '@angular/core';
import { Role } from '@site/app/define/role';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { TplSearchBarComponent } from '@site/app/components/tpl-search-bar/tpl-search-bar.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NgForOf, NgIf } from '@angular/common';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { User } from '@site/app/define/user';
import { RoleService } from '@site/app/services/role/role.service';

@Component({
  selector: 'app-role-manage',
  standalone: true,
  imports: [
    NzTableModule,
    FormsModule,
    NzInputDirective,
    ReactiveFormsModule,
    TplSearchBarComponent,
    NzButtonComponent,
    NzIconDirective,
    NgForOf,
    NgIf,
    NzPopconfirmDirective,
    NzWaveDirective
  ],
  templateUrl: './role-manage.component.html',
  styleUrl: './role-manage.component.css'
})
export class RoleManageComponent implements OnInit {

  roles: Role[] = [];
  searchForm = this.fb.group({
    roleName: [''],
    roleCode: ['']
  });
  tableOptions = {
    total: 0,
    pageIndex: 1,
    pageSize: 15
  };
  tableLoading = false;
  deleteLoading = false;
  stateLoading = false;

  constructor(private fb: NonNullableFormBuilder, private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  search() {
    this.tableOptions.pageIndex = 1;
    this.loadRoles();
  }

  loadRoles() {
    this.tableLoading = true;
    this.roles = [];
    this.roleService.queryRoles({
      ...this.searchForm.value,
      page: this.tableOptions.pageIndex,
      pageSize: this.tableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.roles = res.data;
        }
      },
      complete: () => this.tableLoading = false
    });

  }

  showAddModal() {

  }

  showEditModal(role: Role) {
  }

  delete(roleId: string) {

  }

  disable(role: Role) {

  }

  enable(role: Role) {

  }

}
