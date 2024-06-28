import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import {
  FormControl,
  FormGroup, NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { UserService } from '@site/app/services/sys/user.service';
import { User } from '@site/app/define/user';
import { RoleSelectComponent } from '@site/app/components/form/role-select/role-select.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-add-modal',
  standalone: true,
  imports: [
    NgIf,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    NzInputDirective,
    NzModalModule,
    NzOptionComponent,
    NzRowDirective,
    NzSelectComponent,
    NzSwitchComponent,
    ReactiveFormsModule,
    RoleSelectComponent
  ],
  templateUrl: './user-add-modal.component.html',
  styleUrl: './user-add-modal.component.css'
})
export class UserAddModalComponent {
  isVisible = false;
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  loading = false;
  isEdit = false;

  userForm: FormGroup<{
    userId: FormControl<string>;
    username: FormControl<string>;
    password: FormControl<string>;
    name: FormControl<string>;
    phoneNumber: FormControl<string>;
    deptId: FormControl<string>;
    deptName: FormControl<string>;
    roles: FormControl<string[]>;
  }> = this.fb.group({
    userId: [''],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    name: ['', [Validators.required]],
    phoneNumber: [''],
    deptId: [''],
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

  showUpdateModal(user: User): void {
    this.isEdit = true;
    this.toggleValidations(this.isEdit);
    this.userForm.reset();
    this.userForm.patchValue({
      userId: user.userId,
      username: user.username,
      name: user.name,
      phoneNumber: user.phoneNumber,
      deptId: user.deptId,
      deptName: user.deptName,
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
    this.userService.addUser(this.userForm.value as User).subscribe({
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
    this.userService.updateUser(this.userForm.value as User).subscribe({
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
