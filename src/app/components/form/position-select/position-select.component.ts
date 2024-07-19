import { Component, EventEmitter, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SimplePosition } from '@site/app/define/sys/position';
import { PositionService } from '@site/app/services/sys/position.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-position-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    NzSelectModule,
  ],
  templateUrl: './position-select.component.html',
  styleUrl: './position-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PositionSelectComponent),
      multi: true
    }
  ]
})
export class PositionSelectComponent implements OnInit, ControlValueAccessor {
  @Input('dkWidth') width: string = 'auto';
  @Input('dkMode') mode: 'multiple' | 'tags' | 'default' = 'default';
  value?: string | string[];
  options: SimplePosition[] = [];
  isDisabled = false
  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  constructor(private positionService: PositionService) {
  }

  ngOnInit(): void {
    this.positionService.findAll().subscribe(res => {
      if (res.success) {
        this.options = res.data || [];
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
