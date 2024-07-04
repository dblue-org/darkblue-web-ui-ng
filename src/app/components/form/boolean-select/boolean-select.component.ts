import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-boolean-select',
  standalone: true,
  imports: [
    NzSelectModule,
    NgForOf,
    FormsModule
  ],
  templateUrl: './boolean-select.component.html',
  styleUrl: './boolean-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BooleanSelectComponent),
      multi: true
    }
  ]
})
export class BooleanSelectComponent implements ControlValueAccessor {
  @Input('dkWidth') width: string = 'auto';
  value?: boolean;
  isDisabled = false
  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  onModalValueChange() {
    this.onChange(this.value)
  }


}
