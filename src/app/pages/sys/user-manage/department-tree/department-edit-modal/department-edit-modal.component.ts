import { Component, EventEmitter, Output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RoleSelectComponent } from '@site/app/components/form/role-select/role-select.component';
import { Department } from '@site/app/define/user';
import { DepartmentService } from '@site/app/services/sys/department.service';
import { DepartmentSelectComponent } from '@site/app/components/form/department-select/department-select.component';
import { UserSelectComponent } from '@site/app/components/form/user-select/user-select.component';

@Component({
  selector: 'app-department-edit-modal',
  standalone: true,
  imports: [
    NgIf,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzModalModule,
    NzRowDirective,
    ReactiveFormsModule,
    RoleSelectComponent,
    DepartmentSelectComponent,
    UserSelectComponent

  ],
  templateUrl: './department-edit-modal.component.html',
  styleUrl: './department-edit-modal.component.css'
})
export class DepartmentEditModalComponent {
  isVisible = false;
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  loading = false;
  isEdit = false;
  disableDepartmentId = '';
  departmentForm = this.formBuilder.group({
    deptId: [''],
    deptName: ['', [Validators.required]],
    parentId: [''],
    masterUserId: ['']
  })

  constructor(private formBuilder: NonNullableFormBuilder, private departmentService: DepartmentService) {
  }


  showAddModal(parentId: string): void {
    this.isEdit = false;
    this.disableDepartmentId = '';
    this.departmentForm.reset();
    this.departmentForm.patchValue({
      parentId
    })
    this.isVisible = true;
  }

  showUpdateModal(deptId: string): void {
    this.isEdit = true;
    this.departmentService.get(deptId).subscribe(res => {
      if (res.success && res.data) {
        const dept: Department = res.data;
        this.disableDepartmentId = dept.deptId;
        this.departmentForm.reset();
        this.departmentForm.patchValue(dept);
        this.isVisible = true;
      }
    })

  }

  handleOk(): void {
    if (this.departmentForm.valid) {
      this.loading = true;
      if (this.isEdit) {
        this.doUpdate();
      } else {
        this.doSave();
      }
    } else {
      Object.values(this.departmentForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }

  }

  doSave() {
    this.departmentService.add(this.departmentForm.value as Department).subscribe({
      next: res => {
        if (res.success) {
          this.onSaveSuccess()
        }
      },
      complete: () => this.loading = false
    })
  }

  doUpdate() {
    this.departmentService.update(this.departmentForm.value as Department).subscribe({
      next: res => {
        if (res.success) {
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
}
