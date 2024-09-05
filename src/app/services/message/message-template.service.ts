import { Injectable } from '@angular/core';
import { delay, Observable, of } from "rxjs";
import { ResponseBean } from "@site/app/define/sys/response";
import { DictionaryListVo } from "@site/app/define/settings/dictionary";
import {
  MessageTemplateGroupAddDto,
  MessageTemplateGroupListVo, MessageTemplateGroupUpdateDto
} from "@site/app/define/message/message-template-group";
import {
  MessageTemplateAddDto,
  MessageTemplateListVo, MessageTemplateQueryDto,
  MessageTemplateUpdateDto
} from "@site/app/define/message/message-template";

@Injectable({
  providedIn: 'root'
})
export class MessageTemplateService {

  constructor() { }

  findMessageTemplates(params: MessageTemplateQueryDto): Observable<ResponseBean<MessageTemplateListVo[]>> {
    return of({
      success: true,
      data: [
        {
          messageTemplateId: '4156456464',
          messageTemplateCode: 'CONTRACT-AUDIT',
          messageTemplateName: '消息审批',
          messageTitle: '合同标题-${contractTitle}',
          messageContent: '666666666',
          messageTemplateGroupId: '001',
          messageTemplateGroupName: '合同',
          createTime: '2024-08-16 23:55:55'
        },

      ]
    }).pipe(delay(1000))
  }

  add(addDto: MessageTemplateAddDto): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  update(updateDto: MessageTemplateUpdateDto): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  delete(messageTemplateId: string): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }
}
