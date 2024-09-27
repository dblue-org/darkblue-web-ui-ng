import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  DetailsOperationBarComponent
} from "@site/app/components/layout/details-operation-bar/details-operation-bar.component";
import { CommonModule } from "@angular/common";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzTreeModule, NzTreeNodeOptions } from "ng-zorro-antd/tree";
import { SectionComponent } from "@site/app/components/layout/section/section.component";
import { BoxContainerComponent } from "@site/app/components/layout/box-container/box-container.component";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzIconModule } from "ng-zorro-antd/icon";
import {
  MessageTemplateTestModalComponent
} from "@site/app/pages/message/message-template/message-template-details/message-template-test-modal/message-template-test-modal.component";
import { MessageTemplateService } from '@site/app/services/message/message-template.service';
import {
  MessageTemplateActionVo,
  MessageTemplateDetailsVo,
  MessageTemplateLinkVo,
  MessageTemplateTagVo
} from '@site/app/define/message/message-template';

@Component({
  selector: 'app-message-template-details',
  standalone: true,
  imports: [
    CommonModule,

    NzButtonModule,
    NzGridModule,
    NzTreeModule,
    NzDescriptionsModule,
    NzTableModule,
    NzToolTipModule,
    NzIconModule,

    DetailsOperationBarComponent,
    SectionComponent,
    BoxContainerComponent,
    MessageTemplateTestModalComponent
  ],
  templateUrl: './message-template-details.component.html',
  styleUrl: './message-template-details.component.css'
})
export class MessageTemplateDetailsComponent implements OnInit {

  @ViewChild('messageTemplateTestModalComponent') messageTemplateTestModalComponent!: MessageTemplateTestModalComponent;

  @Input('messageTemplateId')
  messageTemplateId: string = '';

  details?: MessageTemplateDetailsVo;
  directRouters: MessageTemplateLinkVo[] = []
  tags: MessageTemplateTagVo[] = []
  actions: MessageTemplateActionVo[] = []
  varTree: NzTreeNodeOptions[] = []

  constructor(private messageTemplateService: MessageTemplateService) {
  }

  showTestModal() {
    this.messageTemplateTestModalComponent.showModal(this.messageTemplateId, this.varTree);
  }

  ngOnInit(): void {
    this.messageTemplateService.getDetails(this.messageTemplateId, true).subscribe({
      next: response => {
        if (response.success && response.data) {
          this.details = response.data;
          this.directRouters = this.details.directRouters || [];
          this.tags = this.details.tags || [];
          this.actions = this.details.actions || [];
          this.varTree = this.details.variables || [];
        }
      }
    })
  }
}
