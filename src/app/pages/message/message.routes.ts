import {Routes} from "@angular/router";
import {MessageTemplateComponent} from "@site/app/pages/message/message-template/message-template.component";
import {
  MessageTemplateEditComponent
} from '@site/app/pages/message/message-template/message-template-edit/message-template-edit.component';

export const MESSAGE_ROUTES: Routes = [
  { path: 'template', component: MessageTemplateComponent, title: '消息模板', data: {shouldReuse: true}},
  { path: 'template/create', component: MessageTemplateEditComponent, title: '添加消息模板', data: {shouldReuse: true}},
  { path: 'template/edit', component: MessageTemplateEditComponent, title: '编辑消息模板', data: {shouldReuse: true}},
]
