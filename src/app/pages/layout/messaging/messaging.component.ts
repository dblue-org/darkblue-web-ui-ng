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

    ActionComponent
  ],
  templateUrl: './messaging.component.html',
  styleUrl: './messaging.component.css'
})
export class MessagingComponent {
  visible = false;

  todoList: TodoItem[] = [
    {
      type: '合同',
      createTime: '2024-10-05 12:30',
      status: '待审批',
      title: '合同审批，这是一个比较长的待办标题',
      content: [
        '合同名称：太空发射计划',
        '合同编号：HT-2024-000001',
        '客户：NASA',
        '合同金额：300亿美元'
      ],
      tags: [
        '大客户合同', '跨国合同'
      ],
      actions: [
        {name: '去审批', url: '/'},
        {name: '详情', url: '/'}
      ]
    },
    {
      type: '合同',
      createTime: '2024-10-05 12:30',
      status: '待审批',
      title: '合同审批',
      content: [
        '合同名称：太空发射计划',
        '合同编号：HT-2024-000001',
        '客户：NASA',
        '合同金额：300亿美元'
      ],
      actions: [
        {name: '去审批', url: '/'},
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
