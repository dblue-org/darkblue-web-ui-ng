import { Component, forwardRef, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-list-scope',
  standalone: true,
  imports: [
    FormsModule,
    NzInputModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule
  ],
  templateUrl: './list-scope.component.html',
  styleUrl: './list-scope.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListScopeComponent),
      multi: true
    }
  ]
})
export class ListScopeComponent implements ControlValueAccessor {

  value: ({key: number, value: string})[] = [];
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

  writeValue(obj: string[]): void {
    this.value = [];
    if (obj != null) {
      obj.forEach(val => {
        this.value.push({
          key: Math.random(),
          value: val
        })
      })
    }
  }

  onModalValueChange() {
    const vals: Set<string> = new Set();
    for (const valueElement of this.value) {
      if (valueElement.value && valueElement.value.length > 0) {
        vals.add(valueElement.value)
      }
    }
    this.onChange(Array.from(vals))
  }

  addItem() {
    this.value.push({
      key: Math.random(),
      value: ''
    })
  }

  removeItem(i: number) {
    this.value.splice(i, 1);
    this.onModalValueChange();
  }

}
