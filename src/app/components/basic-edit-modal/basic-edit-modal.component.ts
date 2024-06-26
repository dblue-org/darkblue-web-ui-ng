import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  template: '',
})
export abstract class BasicEditModalComponent {
  isVisible = false;
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  loading = false;
  isEdit = false;

  abstract getFormGroup(): FormGroup;

  showAddModal(data?: any): void {
    this.isEdit = false;
    this.getFormGroup().reset();
    this.beforeAddShowProcessor(data);
    this.isVisible = true;
  }

  protected beforeAddShowProcessor(data?: any): void {

  }

  showUpdateModal(data: any): void {
    this.isEdit = true;
    this.getFormGroup().reset();
    this.beforeUpdateShowProcessor(data)
    this.isVisible = true;
  }

  protected beforeUpdateShowProcessor(data: any): void {

  }

  handleOk(): void {
    if (this.getFormGroup().valid) {
      this.loading = true;
      if (this.isEdit) {
        this.doUpdate();
      } else {
        this.doSave();
      }
    } else {
      Object.values(this.getFormGroup().controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }
  protected abstract doSave(): void;
  protected abstract doUpdate(): void;

  handleCancel(): void {
    this.isVisible = false;
  }

  onSaveSuccess(): void {
    this.isVisible = false;
    this.onSuccess.emit();
  }
}
