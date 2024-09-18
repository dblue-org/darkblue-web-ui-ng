import {Routes} from "@angular/router";
import {MessageTemplateComponent} from "@site/app/pages/message/message-template/message-template.component";
import {
  MessageTemplateEditComponent
} from '@site/app/pages/message/message-template/message-template-edit/message-template-edit.component';
import { NotificationManageComponent } from "@site/app/pages/message/notification-manage/notification-manage.component";
import { TodoManageComponent } from "@site/app/pages/message/todo-manage/todo-manage.component";
import {
  MessageTemplateDetailsComponent
} from "@site/app/pages/message/message-template/message-template-details/message-template-details.component";

export const MESSAGE_ROUTES: Routes = [
  { path: 'template', component: MessageTemplateComponent, title: '消息模板', data: {shouldReuse: true}},
  { path: 'template/create', component: MessageTemplateEditComponent, title: '添加消息模板', data: {shouldReuse: true}},
  { path: 'template/edit', component: MessageTemplateEditComponent, title: '编辑消息模板', data: {shouldReuse: true}},
  { path: 'template/details', component: MessageTemplateDetailsComponent, title: '消息模板详情', data: {shouldReuse: true}},
  { path: 'notification', component: NotificationManageComponent, title: '通知管理', data: {shouldReuse: true}},
  { path: 'todo', component: TodoManageComponent, title: '待办管理', data: {shouldReuse: true}},
]
