import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DetailsOperationBarComponent
} from '@site/app/components/layout/details-operation-bar/details-operation-bar.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageTemplateService } from '@site/app/services/message/message-template.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SectionComponent } from '@site/app/components/layout/section/section.component';

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

    SectionComponent,
    DetailsOperationBarComponent,
  ],
  templateUrl: './message-template-edit.component.html',
  styleUrl: './message-template-edit.component.css'
})
export class MessageTemplateEditComponent {
  dataForm = this.formBuilder.group({
    messageTemplateGroupId: ['', [Validators.required]],
    messageTemplateGroupName: ['']
  })

  constructor(private formBuilder: NonNullableFormBuilder, private messageTemplateService: MessageTemplateService,
              private messageService: NzMessageService) {
  }
}
