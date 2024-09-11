import { Component, EventEmitter, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgForOf } from '@angular/common';
import { MessageTemplateGroupListVo } from "@site/app/define/message/message-template-group";
import { MessageTemplateGroupService } from "@site/app/services/message/message-template-group.service";

@Component({
  selector: 'app-message-template-group-select',
  standalone: true,
  imports: [
    NzSelectModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './message-template-group-select.component.html',
  styleUrl: './message-template-group-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MessageTemplateGroupSelectComponent),
      multi: true
    }
  ]
})
export class MessageTemplateGroupSelectComponent implements OnInit, ControlValueAccessor {
  @Input('dkWidth') width: string = 'auto';
  @Input('dkPlaceholder') placeholder: string = '请选择消息组';
  value?: string[];
  options?: MessageTemplateGroupListVo[] = [];
  isDisabled = false
  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  constructor(private messageTemplateGroupService: MessageTemplateGroupService) {
  }

  ngOnInit(): void {
    this.messageTemplateGroupService.findMessageTemplateGroups().subscribe(res => {
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
