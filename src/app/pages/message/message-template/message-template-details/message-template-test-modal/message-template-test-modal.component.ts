import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzInputModule } from "ng-zorro-antd/input";
import { FormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzTagModule } from "ng-zorro-antd/tag";

@Component({
  selector: 'app-message-template-test-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    NzModalModule,
    NzInputModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzTagModule
  ],
  templateUrl: './message-template-test-modal.component.html',
  styleUrl: './message-template-test-modal.component.css'
})
export class MessageTemplateTestModalComponent {
  isVisible = false;
  varModel = '';
  step = 1;

  resolvedMessage: any = {
    messageTitle: '河南XXX公司采购合同',
    messageContent: '合同编码：HT-B-2024000019\n客户：河南XXX公司采购合同\n合同金额：2000000\n结算方式：一次性付清',
    serviceCode: 'HT-B-2024000019',
    tags: ['大客户']
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
  }

  showModal(messageTemplateId: string, vars: any[]) {
    this.step = 1;
    this.isVisible = true;
    const data: any = {};
    this.buildVars(data, vars);
    this.varModel = JSON.stringify(data, null, 4);
  }

  next() {
    this.step = 2;
  }

  buildVars(data: any, vars: any[]) {
    vars.forEach(o => {
      if (o.children && o.children.length > 0) {
        data[o.key] = {};
        this.buildVars(data[o.key], o.children);
      } else {
        data[o.key] = '';
      }
    })
  }
}
