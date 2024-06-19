import { Component, OnInit } from '@angular/core';
import { Department } from '../../../define/user';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormatEmitEvent, NzTreeModule, NzTreeNodeOptions, NzTreeNode } from 'ng-zorro-antd/tree';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { DepartmentService } from '../../../services/dept/department.service';
import { NgIf } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { FormSearchBarComponent } from '../../../components/form-search-bar/form-search-bar.component';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  SearchFormItemComponent
} from '../../../components/form-search-bar/search-form-item/search-form-item.component';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [
    NzGridModule,
    NzTreeModule,
    NzTabsModule,
    NzButtonModule,
    NzLayoutModule,
    NzIconModule,
    NzCardModule,
    NgIf,
    FormSearchBarComponent,
    SearchFormItemComponent,
    NzInputDirective,
    ReactiveFormsModule,
    NzFormDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent
  ],
  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.css'
})
export class UserManageComponent implements OnInit{

  departments: NzTreeNodeOptions[] = [];
  selectedDepartment!: NzTreeNode;
  userSearchForm: FormGroup<{
    name: FormControl<string>;
    department: FormControl<string>;
    status: FormControl<number>;
  }> = this.fb.group({
    name: [''],
    department: [''],
    status: [0]
  })

  constructor(private departmentService: DepartmentService, private fb: NonNullableFormBuilder) {

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
          children: this.toTreeNodes(res.data)
        }]
      }
    })
  }

  onTreeNodeSelected(event:NzFormatEmitEvent): void {
    if (event.node) {
      this.selectedDepartment = event.node;
    }
  }

  search(formData: any) {
  }

  reset() {
    this.userSearchForm.reset();
  }

  private toTreeNodes(departments: Department[] | undefined): NzTreeNodeOptions[] {
    if (!departments) {
      return []
    }

    let nodes: NzTreeNodeOptions[] = []
    departments.forEach(dept => {
      let node: NzTreeNodeOptions = {
        title: dept.deptName,
        key: dept.deptId,
        isLeaf: !dept.children,
        children: this.toTreeNodes(dept.children)
      }
      nodes.push(node)
    })
    return nodes
  }

}
