import {Routes} from "@angular/router";
import {MessageTemplateComponent} from "@site/app/pages/message/message-template/message-template.component";

export const MESSAGE_ROUTES: Routes = [
  { path: 'template', component: MessageTemplateComponent, title: '消息模板', data: {shouldReuse: true}},
]
