import { Component, EventEmitter, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgForOf } from '@angular/common';
import { MessageTemplateService } from "@site/app/services/message/message-template.service";
import { EnumValue } from '@site/app/define/common';

@Component({
  selector: 'app-router-type-select',
  standalone: true,
  imports: [
    NzSelectModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './router-type-select.component.html',
  styleUrl: './router-type-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RouterTypeSelectComponent),
      multi: true
    }
  ]
})
export class RouterTypeSelectComponent implements OnInit, ControlValueAccessor {
  @Input('dkWidth') width: string = 'auto';
  @Input('dkPlaceHolder') placeHolder: string = '请选择路由类型';
  value?: string[];
  options?: EnumValue[] = [];
  isDisabled = false
  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  constructor(private messageTemplateService: MessageTemplateService) {
  }

  ngOnInit(): void {
    this.messageTemplateService.getRouterTypes().subscribe(res => {
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
