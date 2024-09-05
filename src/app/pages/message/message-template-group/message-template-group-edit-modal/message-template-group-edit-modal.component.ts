import { Component } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { MessageTemplateGroupService } from "@site/app/services/message/message-template-group.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { BasicEditModalComponent } from "@site/app/components/basic-edit-modal/basic-edit-modal.component";
import { Observable } from "rxjs";
import { ResponseBean } from "@site/app/define/sys/response";
import {
  MessageTemplateGroupAddDto,
  MessageTemplateGroupUpdateDto
} from "@site/app/define/message/message-template-group";

@Component({
  selector: 'app-message-template-group-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzModalModule,
    NzFormModule,
    NzInputModule
  ],
  templateUrl: './message-template-group-edit-modal.component.html',
  styleUrl: './message-template-group-edit-modal.component.css'
})
export class MessageTemplateGroupEditModalComponent extends BasicEditModalComponent {

  dataForm = this.formBuilder.group({
    messageTemplateGroupId: [''],
    messageTemplateGroupName: ['', [Validators.required]]
  })

  constructor(private formBuilder: NonNullableFormBuilder, private messageTemplateGroupService: MessageTemplateGroupService,
              private messageService: NzMessageService) {
    super()
  }

  protected doSave(): Observable<ResponseBean<void>> {
    return this.messageTemplateGroupService.add(this.dataForm.value as MessageTemplateGroupAddDto);
  }

  protected doUpdate(): Observable<ResponseBean<void>> {
    return this.messageTemplateGroupService.update(this.dataForm.value as MessageTemplateGroupUpdateDto);
  }

  getFormGroup(): FormGroup {
    return this.dataForm;
  }

  protected override beforeUpdateShowProcessor(data: any) {
    this.dataForm.patchValue(data)
  }


  override onSaveSuccess() {
    this.messageService.success(this.isEdit ? '消息模板组更新成功' : '消息模板组创建成功');
  }

}
