import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EnumItem } from '@site/app/define/settings/property';
import { CommonModule } from '@angular/common';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-enum-list-scope',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    NzInputModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzInputNumberModule
  ],
  templateUrl: './enum-list-scope.component.html',
  styleUrl: './enum-list-scope.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EnumListScopeComponent),
      multi: true
    }
  ]
})
export class EnumListScopeComponent  implements ControlValueAccessor {

  value: ({key: number, value: number, label: string})[] = [];
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

  writeValue(obj: EnumItem[]): void {
    this.value = [];
    if (obj != null) {
      obj.forEach(val => {
        this.value.push({
          key: Math.random(),
          value: val.value,
          label: val.label
        })
      })
    }
  }

  onModalValueChange() {
    const vals: Set<number> = new Set();
    const items: EnumItem[] = [];
    for (const valueElement of this.value) {
      if (valueElement.value != undefined && valueElement.label.length > 0 && !vals.has(valueElement.value)) {
        vals.add(valueElement.value)
        items.push({
          value: valueElement.value,
          label: valueElement.label
        })
      }
    }
    this.onChange(Array.from(items))
  }

  addItem() {
    this.value.push({
      key: Math.random(),
      value: this.getNextValue(),
      label: ''
    })
  }

  removeItem(i: number) {
    this.value.splice(i, 1);
    this.onModalValueChange();
  }

  moveUp(i: number) {
    const pre = this.value[i - 1];
    this.value[i - 1] = this.value[i];
    this.value[i] = pre;
  }

  moveDown(i: number) {
    const next = this.value[i + 1];
    this.value[i + 1] = this.value[i];
    this.value[i] = next;
  }

  getNextValue() {
    let maxValue: number = 0;
    this.value.forEach(item => {
      if (item.value > maxValue) {
        maxValue = item.value;
      }
    });
    maxValue++;
    return maxValue;
  }

}
