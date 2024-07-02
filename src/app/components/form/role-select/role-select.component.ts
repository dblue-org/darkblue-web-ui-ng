import { Component, EventEmitter, forwardRef, Input, OnInit } from '@angular/core';
import { SimpleRole } from '../../../define/sys/role';
import { RoleService } from '../../../services/sys/role.service';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-role-select',
  standalone: true,
  imports: [
    NzSelectModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './role-select.component.html',
  styleUrl: './role-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RoleSelectComponent),
      multi: true
    }
  ]
})
export class RoleSelectComponent implements OnInit, ControlValueAccessor {
  @Input('dkWidth') width: string = 'auto';
  value?: string[];
  options?: SimpleRole[] = [];
  isDisabled = false
  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(res => {
      if (res.success) {
        this.options = res.data;
      }
    });
  }

  onModalValueChange(event: EventEmitter<any>) {
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

  writeValue(value: any): void {
    this.value = value;
  }
}
