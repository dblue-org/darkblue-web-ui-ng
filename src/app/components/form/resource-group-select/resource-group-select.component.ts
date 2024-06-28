import { Component, forwardRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ResourceGroup } from '@site/app/define/sys/resource';
import { ResourcesGroupService } from '@site/app/services/sys/resources-group.service';

@Component({
  selector: 'app-resource-group-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
  ],
  templateUrl: './resource-group-select.component.html',
  styleUrl: './resource-group-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ResourceGroupSelectComponent),
      multi: true
    }
  ]
})
export class ResourceGroupSelectComponent implements OnInit, ControlValueAccessor{

  value?: string[];
  options?: ResourceGroup[] = [];
  isDisabled = false
  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  constructor(private resourceGroupService: ResourcesGroupService) {
  }

  ngOnInit(): void {
    this.resourceGroupService.getAll().subscribe(res => {
      if (res.success) {
        this.options = res.data;
      }
    })
  }

  onSelectChange() {
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
