import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ActionComponent } from './action/action.component';
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { FormsModule } from "@angular/forms";

export interface Action {
  name: string;
  url: string
}
export interface TodoItem {
  type: string;
  createTime: string;
  status: string;
  title: string,
  content: string[];
  tags?: string[];
  actions?: Action[]
}

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,

    NzDrawerModule,
    NzTabsModule,
    NzListModule,
    NzDescriptionsModule,
    NzTagModule,
    NzGridModule,
    NzButtonModule,
    NzCardModule,
    NzCheckboxModule,
    NzBadgeModule,
    NzRadioModule,

    ActionComponent,
    FormsModule
  ],
  templateUrl: './messaging.component.html',
  styleUrl: './messaging.component.css'
})
export class MessagingComponent {
  visible = false;
  todoType = 0;
  todoList: TodoItem[] = [
    {
      type: '合同',
      createTime: '2024-10-05 12:30',
      status: '待审批',
      title: '河南XXX有限公司采购合同',
      content: [
        '合同编号：HT-2024-000001',
        '客户：河南XXX有限公司',
        '合同金额：2000000'
      ],
      tags: [
        '大客户'
      ],
      actions: [
        {name: '去审批', url: '/'},
        {name: '详情', url: '/'}
      ]
    },
    {
      type: '合同',
      createTime: '2024-10-05 12:30',
      status: '审批通过',
      title: '河南XXX有限公司销售合同',
      content: [
        '合同编号：HT-2024-000002',
        '客户：河南XXX有限公司',
        '合同金额：2000000'
      ],
      actions: [
        {name: '详情', url: '/'}
      ]
    }
  ]

  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  createActionTemplates(actions: Action[] | undefined): TemplateRef<any>[] {
    if (actions && actions.length > 0) {
      const actionTemplates: TemplateRef<any>[] = [];
      actions.forEach(action => {
        const componentRef = this.container.createComponent(ActionComponent);
        componentRef.instance.action = action;
        actionTemplates.push(componentRef.instance.actionTemplate);
        componentRef.destroy();
      })
      return actionTemplates;
    } else {
      return [];
    }
  }
}
