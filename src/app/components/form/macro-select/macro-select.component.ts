import { Component, EventEmitter, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgForOf } from '@angular/common';
import { MessageTemplateActionMacro } from "@site/app/define/message/message-template";
import { MessageTemplateService } from "@site/app/services/message/message-template.service";

@Component({
  selector: 'app-macro-select',
  standalone: true,
  imports: [
    NzSelectModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './macro-select.component.html',
  styleUrl: './macro-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MacroSelectComponent),
      multi: true
    }
  ]
})
export class MacroSelectComponent implements OnInit, ControlValueAccessor {
  @Input('dkWidth') width: string = 'auto';
  value?: string[];
  options?: MessageTemplateActionMacro[] = [];
  isDisabled = false
  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  constructor(private messageTemplateService: MessageTemplateService) {
  }

  ngOnInit(): void {
    this.messageTemplateService.getMacros().subscribe(res => {
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
