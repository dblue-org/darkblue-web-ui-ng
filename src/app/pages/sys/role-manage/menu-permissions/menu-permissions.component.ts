import { Component, EventEmitter, forwardRef, Input, OnInit } from '@angular/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { MenuPermissionsVo } from '@site/app/define/sys/menu';

@Component({
  selector: 'app-menu-permissions',
  standalone: true,
  imports: [
    NzCheckboxModule,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './menu-permissions.component.html',
  styleUrl: './menu-permissions.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MenuPermissionsComponent),
      multi: true
    }
  ]
})
export class MenuPermissionsComponent implements ControlValueAccessor {

  value!: MenuPermissionsVo;
  isDisabled = false;
  checkedAll = false;
  indeterminate = false;
  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  onModalValueChange(values: string[]) {
    this.onChange(this.value);
    this.updateCheckState();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(val: MenuPermissionsVo): void {
    this.value = val;
    this.updateCheckState();
  }

  onCheckedAllClick(val: boolean) {
    if (val) {
      this.value.permissions.forEach(item => {
        item.checked = true;
      });
    } else {
      this.value.permissions.forEach(item => {
        item.checked = false;
      });
    }
    this.updateCheckState();
  }

  private updateCheckState() {
    if (this.value && this.value.permissions) {
      this.checkedAll = this.value.permissions.every(item => item.checked);
      this.indeterminate = this.value.permissions.some(item => item.checked) && !this.checkedAll;
    } else {
      this.checkedAll = false;
      this.indeterminate = false;
    }
  }

}
