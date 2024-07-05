import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ResourceGroup } from '@site/app/define/sys/resource';
import { EnumItem, NumberScope } from '@site/app/define/settings/property';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-value',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    NzDatePickerModule,
    NzColorPickerModule,
    NzInputNumberModule
  ],
  templateUrl: './property-value.component.html',
  styleUrl: './property-value.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PropertyValueComponent),
      multi: true
    }
  ]
})
export class PropertyValueComponent implements ControlValueAccessor{

  @Input('dkPropertyType') type = 1;
  @Input('dkNumberScope') numberScope: NumberScope = {
    min: -Infinity,
    max: Infinity
  }
  @Input('dkEnumScope') enumScope: EnumItem[] = []

  // fixed NG0956
  @Input('dkListScope')
  set listScope(items: string[]) {
    this.listOptions = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      this.listOptions.push({
        key: i,
        value: item
      })
    }
  }

  value?: string[];
  listOptions: any[] = [];
  isDisabled = false

  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  onValueChange() {
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
}
