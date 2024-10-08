import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Department } from 'src/app/define/sys/user';
import { DepartmentService } from '@site/app/services/sys/department.service';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-department-select',
  standalone: true,
  imports: [
    FormsModule,
    NzTreeSelectModule
  ],
  templateUrl: './department-select.component.html',
  styleUrl: './department-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DepartmentSelectComponent),
      multi: true
    }
  ]
})
export class DepartmentSelectComponent implements OnChanges, OnInit, ControlValueAccessor {
  @Input('disableDepartment') disableDepartment!: string;
  @Input('dkDisabled') disabled = false;
  @Input('dkMultiple') isMultiple = false;
  nodes: NzTreeNodeOptions[] = [];
  value?: string[] | string;
  departments?: Department[] = [];
  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  constructor(private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe(res => {
      if (res.success) {
        this.departments = res.data;
        this.nodes = this.departmentService.toTreeNodes(this.departments, this.disableDepartment);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disableDepartment'] && this.departments) {
      this.nodes = this.departmentService.toTreeNodes(this.departments, this.disableDepartment);
    }
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

  writeValue(value: any): void {
    this.value = value;
  }

}
