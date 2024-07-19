import { Component } from '@angular/core';
import { BasicEditModalComponent } from '@site/app/components/basic-edit-modal/basic-edit-modal.component';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PermissionService } from '@site/app/services/sys/permission.service';
import { Permission } from '@site/app/define/sys/permission';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  permissionCodeValidator
} from '@site/app/pages/sys/permission-manage/permission-edit-modal/permission-code.directive';

@Component({
  selector: 'app-permission-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzRadioModule,
    NzButtonModule
  ],
  templateUrl: './permission-edit-modal.component.html',
  styleUrl: './permission-edit-modal.component.css'
})
export class PermissionEditModalComponent extends BasicEditModalComponent {

  dataForm = this.formBuilder.group({
    menuId: ['', [Validators.required]],
    menuName: [''],
    permissionId: [''],
    platform: [1],
    permissionCode: ['', [Validators.required, permissionCodeValidator()]],
    permissionName: ['', [Validators.required]]
  })

  constructor(
    private messageService: NzMessageService, private formBuilder: NonNullableFormBuilder,
    private permissionService: PermissionService) {
    super();
  }


  protected override beforeAddShowProcessor(data?: any) {
    this.dataForm.patchValue(data);
  }

  protected override beforeUpdateShowProcessor(data: any) {
    this.dataForm.patchValue(data);
  }

  doSubmit(isContinue: boolean) {
    if (this.getFormGroup().valid) {
      this.loading = true;
      this.doSubmitRequest().subscribe({
        next: res => {
          if (res.success) {
            this.onSaveSuccess();
            this.onSuccess.emit();
            if (isContinue) {
              this.clearFormOnAdd();
            } else {
              this.isVisible = false;
            }
          }
        },
        complete: () => this.loading = false
      });
    } else {
      Object.values(this.getFormGroup().controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  private doSubmitRequest(): Observable<ResponseBean<void>> {
    if (this.isEdit) {
      return this.doUpdate();
    } else {
      return this.doSave();
    }
  }

  private clearFormOnAdd() {
    this.dataForm.patchValue({
      permissionId: '',
      permissionCode: '',
      permissionName: ''
    });
    Object.values(this.getFormGroup().controls).forEach(control => {
      if (control.invalid) {
        control.markAsPristine();
        control.setErrors(null);
      }
    });
  }

  protected doSave(): Observable<ResponseBean<void>> {
    return this.permissionService.add(this.dataForm.value as Permission);
  }

  protected doUpdate(): Observable<ResponseBean<void>> {
    return this.permissionService.update(this.dataForm.value as Permission);
  }

  getFormGroup(): FormGroup {
    return this.dataForm;
  }

  override onSaveSuccess() {
    this.messageService.success(this.isEdit? '更新成功' : '添加成功');
  }
}
