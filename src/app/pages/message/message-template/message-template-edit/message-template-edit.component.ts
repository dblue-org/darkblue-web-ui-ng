import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DetailsOperationBarComponent
} from '@site/app/components/layout/details-operation-bar/details-operation-bar.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageTemplateService } from '@site/app/services/message/message-template.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SectionComponent } from '@site/app/components/layout/section/section.component';
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { IconifyComponent } from "@site/app/components/icon/iconify/iconify.component";
import { messageTypes, routePlatforms } from "@site/app/define/message/message-template";
import {
  MessageTemplateActionModalComponent
} from "@site/app/pages/message/message-template/message-template-edit/message-template-action-modal/message-template-action-modal.component";

@Component({
  selector: 'app-message-template-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NzButtonComponent,
    NzFormModule,
    NzGridModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzIconModule,
    NzAlertModule,

    SectionComponent,
    DetailsOperationBarComponent,
    IconifyComponent,
    MessageTemplateActionModalComponent,
  ],
  templateUrl: './message-template-edit.component.html',
  styleUrl: './message-template-edit.component.css'
})

export class MessageTemplateEditComponent {

  @ViewChild('messageTemplateActionModalComponent') messageTemplateActionModalComponent!: MessageTemplateActionModalComponent;
  dataForm = this.formBuilder.group({
    messageTemplateGroupId: ['', [Validators.required]],
    messageTemplateGroupName: [''],
    messageTemplateName: ['', [Validators.required]],
    messageTemplateCode: ['', [Validators.required]],
    messageTemplateType: [2, [Validators.required]],
    serviceCodeTpl: [''],
    messageTitleTpl: [''],
    messageContentTpl: [''],
    tags: [[]]
  })

  tags: FormGroup[] = [];
  routers: FormGroup[] = [];

  varDefine = '${变量}';
  messageTemplateTypes = messageTypes;
  messageRoutePlatforms = routePlatforms;

  constructor(private formBuilder: NonNullableFormBuilder, private messageTemplateService: MessageTemplateService,
              private messageService: NzMessageService) {
  }

  addTag() {
    this.tags.push(this.formBuilder.group({
      tagName: ['', [Validators.required]],
      showCondition: ['', [Validators.required]],
    }))
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  addRouter() {
    this.routers.push(this.formBuilder.group({
      routeType: [1, [Validators.required]],
      routeLink: ['', [Validators.required]],
    }))
  }

  removeRouter(index: number) {
    this.routers.splice(index, 1);
  }

  showAddActionModal() {
    this.messageTemplateActionModalComponent.showAddModal();
  }
}