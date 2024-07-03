import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { MenuService } from '@site/app/services/sys/menu.service';
import { MenuItemDto } from '@site/app/define/sys/menu';
import { BasicEditModalComponent } from '@site/app/components/basic-edit-modal/basic-edit-modal.component';

@Component({
  selector: 'app-menu-add-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzModalModule,
    NzButtonModule,
    NzCheckboxModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzSwitchModule,
    NzSelectModule,
    NzIconModule,
  ],
  templateUrl: './menu-add-modal.component.html',
  styleUrl: './menu-add-modal.component.css'
})
export class MenuAddModalComponent extends BasicEditModalComponent implements OnInit  {

  menuForm = this.fb.group({
    menuId: [''],
    parentId: [''],
    parentName: [''],
    menuName: ['', [Validators.required]],
    menuType: [2, [Validators.required]],
    platform: [1],
    menuUrl: [''],
    menuIcon: [''],
    sortNum: [1, [Validators.required]],
    isVisible: [true],
    isProductionVisible: [true]
  });

  constructor(private fb: NonNullableFormBuilder, private menuService: MenuService) {
    super();
  }


  protected override beforeAddShowProcessor(parent: {platform: number, parentId: string, parentName: string}) {
    this.menuForm.patchValue(parent);
  }

  protected override beforeUpdateShowProcessor(data: any) {
    this.menuForm.patchValue(data);
  }

  doSave() {
    return this.menuService.addMenu(this.menuForm.value as MenuItemDto)
  }

  doUpdate() {
    return this.menuService.updateMenu(this.menuForm.value as MenuItemDto);
  }


  override onSaveSuccess(): void {
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

  getFormGroup(): FormGroup {
    return this.menuForm;
  }
}
