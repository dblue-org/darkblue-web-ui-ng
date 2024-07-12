import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import {
  FormControl,
  FormGroup, NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { UserService } from '@site/app/services/sys/user.service';
import { UserAddDto, UserPageListVo, UserUpdateDto } from 'src/app/define/sys/user';
import { RoleSelectComponent } from '@site/app/components/form/role-select/role-select.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DepartmentSelectComponent } from '@site/app/components/form/department-select/department-select.component';
import { PositionSelectComponent } from '@site/app/components/form/position-select/position-select.component';

@Component({
  selector: 'app-user-add-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NzGridModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
    NzSelectModule,
    NzSwitchModule,

    RoleSelectComponent,
    DepartmentSelectComponent,
    PositionSelectComponent
  ],
  templateUrl: './user-add-modal.component.html',
  styleUrl: './user-add-modal.component.css'
})
export class UserAddModalComponent {
  isVisible = false;
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  loading = false;
  isEdit = false;

  userForm = this.fb.group({
    userId: [''],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    name: ['', [Validators.required]],
    phoneNumber: [''],
    deptId: ['', [Validators.required]],
    positionId: [''],
    deptName: [''],
    roles: [['']]
  });

  constructor(private fb: NonNullableFormBuilder, private userService: UserService, private messageService: NzMessageService) {}

  showAddModal(dept: {deptId: string, deptName: string}): void {
    this.isEdit = false;
    this.toggleValidations(this.isEdit);
    this.userForm.reset();
    this.userForm.patchValue({
      ...dept,
      roles: []
    })
    this.isVisible = true;
  }

  showUpdateModal(user: UserPageListVo): void {
    this.isEdit = true;
    this.toggleValidations(this.isEdit);
    this.userForm.reset();
    this.userForm.patchValue({
      ...user,
      roles: user.roles?.map(r => r.roleId)
    });
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.userForm.valid) {
      this.loading = true;
      if (this.isEdit) {
        this.doUpdate();
      } else {
        this.doSave();
      }
    } else {
      Object.values(this.userForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }

  }

  doSave() {
    this.userService.addUser(this.userForm.value as UserAddDto).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('保存成功');
          this.onSaveSuccess()
        }
      },
      complete: () => this.loading = false
    })
  }

  doUpdate() {
    this.userService.updateUser(this.userForm.value as UserUpdateDto).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('修改成功');
          this.onSaveSuccess()
        }
      },
      complete: () => this.loading = false
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  onSaveSuccess(): void {
    this.isVisible = false;
    this.onSuccess.emit();
  }

  toggleValidations(isEdit: boolean) {
    if (isEdit) {
      this.userForm.controls.password.clearValidators();
      this.userForm.controls.password.markAsPristine();
    } else {
      this.userForm.controls.password.setValidators(Validators.required);
      this.userForm.controls.password.markAsDirty();
    }
    this.userForm.controls.password.updateValueAndValidity();
  }
}
