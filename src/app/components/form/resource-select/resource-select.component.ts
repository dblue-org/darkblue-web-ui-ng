import { Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { Mapping } from '@site/app/define/sys/resource';
import { MappingsService } from '@site/app/services/sys/mappings.service';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resource-select',
  standalone: true,
  imports: [
    CommonModule,
    NzTreeSelectModule,
    FormsModule
  ],
  templateUrl: './resource-select.component.html',
  styleUrl: './resource-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ResourceSelectComponent),
      multi: true
    }
  ]
})
export class ResourceSelectComponent implements OnInit, ControlValueAccessor {
  @Output('onSelectedChange') onSelectedChange = new EventEmitter<Mapping>();
  nodes: NzTreeNodeOptions[] = [];
  value?: string;
  mappings: Map<string, Mapping> = new Map<string, Mapping>;
  disabled = false;
  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  constructor(private mappingService: MappingsService) {

  }

  ngOnInit(): void {
    this.mappingService.getAll().subscribe(res => {
      if (res.success && res.data) {
        res.data.forEach(ctl => {
          this.nodes.push({
            key: ctl.tagName,
            title: ctl.tagName,
            selectable: false,
            disabled: true,
            children: ctl.mappings ? ctl.mappings.map(m => {
              return {
                key: m.resourceUrl,
                title: m.resourceName + ' (' + m.resourceUrl + ')',
                isLeaf: true
              }
            }) : []
          })
        })

        res.data.flatMap(ctl => ctl.mappings || []).forEach(m => {
          this.mappings.set(m.resourceUrl, m);
        })
      }
    })
  }

  onSelectChange(event: string) {
    this.onChange(this.value);
    this.onSelectedChange.emit(this.mappings.get(event));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
}
