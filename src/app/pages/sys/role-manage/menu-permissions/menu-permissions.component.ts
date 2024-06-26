import { Component, EventEmitter, forwardRef, Input, OnInit } from '@angular/core';
import { MenuPermissionsVo } from '@site/app/define/role';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

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
  isDisabled = false
  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  onModalValueChange(values: string[]) {
    this.onChange(this.value);
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
  }

}
