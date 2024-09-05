import { Component } from '@angular/core';
import { BasicEditModalComponent } from '@site/app/components/basic-edit-modal/basic-edit-modal.component';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { MessageTemplateService } from '@site/app/services/message/message-template.service';
import { MessageTemplateAddDto, MessageTemplateUpdateDto } from '@site/app/define/message/message-template';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '@site/app/components/layout/section/section.component';

@Component({
  selector: 'app-message-template-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NzFormModule,
    NzGridModule,
    NzModalModule,
    NzInputModule,
    SectionComponent
  ],
  templateUrl: './message-template-edit-modal.component.html',
  styleUrl: './message-template-edit-modal.component.css'
})
export class MessageTemplateEditModalComponent extends BasicEditModalComponent {

  dataForm = this.formBuilder.group({
    messageTemplateGroupId: ['', [Validators.required]],
    messageTemplateGroupName: ['']
  })

  constructor(private formBuilder: NonNullableFormBuilder, private messageTemplateService: MessageTemplateService,
              private messageService: NzMessageService) {
    super()
  }

  protected doSave(): Observable<ResponseBean<void>> {
    return this.messageTemplateService.add(this.dataForm.value as MessageTemplateAddDto);
  }

  protected doUpdate(): Observable<ResponseBean<void>> {
    return this.messageTemplateService.update(this.dataForm.value as MessageTemplateUpdateDto);
  }

  getFormGroup(): FormGroup {
    return this.dataForm;
  }

  protected override beforeAddShowProcessor(data?: any) {
    this.dataForm.patchValue(data)
  }

  protected override beforeUpdateShowProcessor(data: any) {
    this.dataForm.patchValue(data)
  }


  override onSaveSuccess() {
    this.messageService.success(this.isEdit ? '消息模板更新成功' : '消息模板创建成功');
  }

}
