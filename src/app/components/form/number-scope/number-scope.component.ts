import { Component, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { NumberScope } from '@site/app/define/settings/property';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-number-scope',
  standalone: true,
  imports: [
    FormsModule,

    NzGridModule,
    NzInputNumberModule
  ],
  templateUrl: './number-scope.component.html',
  styleUrl: './number-scope.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberScopeComponent),
      multi: true
    }
  ]
})
export class NumberScopeComponent implements ControlValueAccessor, OnChanges {

  value: NumberScope = {min: undefined, max: undefined};
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
    if (obj != null) {
      this.value = obj;
    }
  }

  onModalValueChange() {
    this.onChange(this.value)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.onModalValueChange();
    }
  }
}
