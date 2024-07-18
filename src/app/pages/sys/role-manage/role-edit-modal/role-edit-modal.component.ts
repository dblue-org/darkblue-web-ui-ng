import { Component } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '@site/app/services/sys/role.service';
import { SimpleRole } from '@site/app/define/sys/role';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
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
    roleName: ['', [Validators.required]],
    remark: ['']
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
    return this.roleService.add(this.dataForm.value as SimpleRole);
  }

  doUpdate() {
    return this.roleService.update(this.dataForm.value as SimpleRole);
  }


  override onSaveSuccess() {
    this.messageService.success(this.isEdit ? '角色更新成功' : '角色创建成功');
  }
}
