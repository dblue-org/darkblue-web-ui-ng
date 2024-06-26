import { Component } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '@site/app/services/role/role.service';
import { SimpleRole } from '@site/app/define/role';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {
  NzFormModule
} from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RoleSelectComponent } from '@site/app/components/form/role-select/role-select.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BasicEditModalComponent } from '@site/app/components/basic-edit-modal/basic-edit-modal.component';

@Component({
  selector: 'app-role-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    ReactiveFormsModule,
    RoleSelectComponent
  ],
  templateUrl: './role-edit-modal.component.html',
  styleUrl: './role-edit-modal.component.css'
})
export class RoleEditModalComponent extends BasicEditModalComponent {

  dataForm = this.fb.group({
    roleId: [''],
    roleCode: ['', [Validators.required]],
    roleName: ['', [Validators.required]]
  });

  constructor(private fb: NonNullableFormBuilder, private roleService: RoleService, private messageService: NzMessageService) {
    super();
  }

  getFormGroup(): FormGroup {
    return this.dataForm;
  }


  protected override beforeUpdateShowProcessor(data: SimpleRole) {
    this.dataForm.patchValue(data);
  }

  doSave() {
    this.roleService.add(this.dataForm.value as SimpleRole).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('角色添加成功');
          this.onSaveSuccess()
        }
      },
      complete: () => this.loading = false
    })
  }

  doUpdate() {
    this.roleService.update(this.dataForm.value as SimpleRole).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('角色更新成功');
          this.onSaveSuccess()
        }
      },
      complete: () => this.loading = false
    })
  }


}
