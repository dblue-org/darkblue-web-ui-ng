import { Component, ViewChild } from '@angular/core';
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
export class MessageTemplateDetailsComponent {

  @ViewChild('messageTemplateTestModalComponent') messageTemplateTestModalComponent!: MessageTemplateTestModalComponent;

  varTree: NzTreeNodeOptions[] = [
    {
      title: 'todoType',
      key: 'todoType',
      isLeaf: true
    }, {
      title: 'contractId',
      key: 'contractId',
      isLeaf: true
    },{
      title: 'contractCode',
      key: 'contractCode',
      isLeaf: true
    },{
      title: 'contractName',
      key: 'contractName',
      isLeaf: true
    },{
      title: 'customerName',
      key: 'customerName',
      isLeaf: true
    },{
      title: 'totalAmount',
      key: 'totalAmount',
      isLeaf: true
    },{
      title: 'settlement',
      key: 'settlement',
      children: [
        {
          title: 'type',
          key: 'type',
          isLeaf: true
        }
      ]
    }
  ]

  details = {
    messageTemplateType: 2,
    serviceCodeTpl: '${contractCode}',
    messageTitleTpl: '${contractName}',
    messageContentTpl: '合同编码：${contractCode}\n客户：${customerName}\n合同金额：${totalAmount}\n结算方式：${settlement.type}'
  }

  directRouters = [
    {routerType: '1', routerTypeName: 'PC', routerLink: '/contract/details/${contractId}'},
    {routerType: '2', routerTypeName: 'APP', routerLink: '/contract/details/${contractId}'}
  ]

  tags = [
    {tagName: '大客户', showCondition: '${totalAmount > 1000000}'},
  ]

  actions: any = [
    {
      actionId: '798654564414556152',
      actionName: '详情',
      actionType: 1,
      actionMark: 'details',
      actionMatchState: 0,
      actionShowCondition: '',
      links: [
        {routerType: '1', routerTypeName: 'PC', routerLink: '/contract/details/${contractId}'},
        {routerType: '2', routerTypeName: 'APP', routerLink: '/contract/details/${contractId}'}
      ]
    },
    {
      actionId: '798654564414556153',
      actionName: '同意',
      actionType: 2,
      actionMark: 'Approve',
      actionMatchState: 1,
      actionShowCondition: '${todoType == 1}',
      macro: {
        macroCode: 'TaskApprove',
        macroName: '审批任务通过',
        macroClass: 'com.depsea.macro.TaskApprove'
      }
    }
  ]

  showTestModal() {
    this.messageTemplateTestModalComponent.showModal('', this.varTree);
  }
}
