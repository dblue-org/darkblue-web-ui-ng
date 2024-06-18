import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgIf } from '@angular/common';
import { MenuService } from '../../../../services/menu/menu.service';
import { MenuItem } from '../../../../define/menu';

@Component({
  selector: 'app-menu-add-modal',
  standalone: true,
  imports: [
    NzModalModule,
    FormsModule,
    NzButtonComponent,
    NzCheckboxComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzInputDirective,
    NzInputGroupComponent,
    NzRowDirective,
    ReactiveFormsModule,
    NzFormLabelComponent,
    NzSwitchModule,
    NzSelectModule,
    NzIconModule,
    NgIf
  ],
  templateUrl: './menu-add-modal.component.html',
  styleUrl: './menu-add-modal.component.css'
})
export class MenuAddModalComponent implements OnInit {
  isVisible = false;
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  loading = false;
  isEdit = false;

  menuForm: FormGroup<{
    menuId: FormControl<string>;
    parentId: FormControl<string>;
    parentName: FormControl<string>;
    menuName: FormControl<string>;
    menuType: FormControl<number>;
    menuUrl: FormControl<string>;
    menuIcon: FormControl<string>;
    sort: FormControl<number>;
    isVisible: FormControl<boolean>;
    isProductionVisible: FormControl<boolean>;
  }> = this.fb.group({
    menuId: [''],
    parentId: [''],
    parentName: [''],
    menuName: ['', [Validators.required]],
    menuType: [2, [Validators.required]],
    menuUrl: [''],
    menuIcon: [''],
    sort: [1, [Validators.required]],
    isVisible: [true],
    isProductionVisible: [true]
  });

  constructor(private fb: NonNullableFormBuilder, private menuService: MenuService) {}

  showAddModal(parent: {parentId: string, parentName: string}): void {
    this.isEdit = false;
    this.menuForm.reset();
    this.menuForm.patchValue(parent);
    this.isVisible = true;
  }

  showUpdateModal(menu: MenuItem): void {
    this.isEdit = true;
    this.menuForm.reset();
    this.menuForm.patchValue(menu);
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.menuForm.valid) {
      this.loading = true;
      if (this.isEdit) {
        this.doUpdate();
      } else {
        this.doSave();
      }
    } else {
      Object.values(this.menuForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }

  }

  doSave() {
    this.menuService.addMenu(this.menuForm.value as MenuItem).subscribe(res => {
      if (res.success) {
        this.onSaveSuccess()
      }
    }, null, this.onComplete)
  }

  doUpdate() {
    this.menuService.updateMenu(this.menuForm.value as MenuItem).subscribe(res => {
      if (res.success) {
        this.onSaveSuccess()
      }
    }, null, this.onComplete)
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onComplete() {
    this.loading = false;
  }

  onSaveSuccess(): void {
    this.isVisible = false;
    this.onSuccess.emit();
  }

  /**
   * 动态处理表单必填项
   * @param value 菜单类型
   */
  onMenuTypeChange(value: number) {
    if (value == 1) {
      this.menuForm.controls.menuUrl.clearValidators();
      this.menuForm.controls.menuUrl.markAsPristine();

      this.menuForm.controls.menuIcon.setValidators(Validators.required);
      this.menuForm.controls.menuIcon.markAsDirty();
    } else {
      this.menuForm.controls.menuUrl.setValidators(Validators.required);
      this.menuForm.controls.menuUrl.markAsDirty();

      this.menuForm.controls.menuIcon.clearValidators();
      this.menuForm.controls.menuIcon.markAsPristine();
    }
    this.menuForm.controls.menuUrl.updateValueAndValidity();
    this.menuForm.controls.menuIcon.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.onMenuTypeChange(this.menuForm.controls.menuType.value);
  }
}
