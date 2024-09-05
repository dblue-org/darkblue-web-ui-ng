import { Injectable } from '@angular/core';
import { delay, Observable, of } from "rxjs";
import { ResponseBean } from "@site/app/define/sys/response";
import { DictionaryListVo } from "@site/app/define/settings/dictionary";
import {
  MessageTemplateGroupAddDto,
  MessageTemplateGroupListVo, MessageTemplateGroupUpdateDto
} from "@site/app/define/message/message-template-group";

@Injectable({
  providedIn: 'root'
})
export class MessageTemplateGroupService {

  constructor() { }

  findMessageTemplateGroups(): Observable<ResponseBean<MessageTemplateGroupListVo[]>> {
    return of({
      success: true,
      data: [
        {
          messageTemplateGroupId: '001',
          messageTemplateGroupName: '合同',
          createTime: '2024-08-16 23:55:55'
        },
        {
          messageTemplateGroupId: '002',
          messageTemplateGroupName: '审批类',
          createTime: '2024-08-16 23:55:55'
        }
      ]
    }).pipe(delay(1000))
  }

  add(addDto: MessageTemplateGroupAddDto): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  update(updateDto: MessageTemplateGroupUpdateDto): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  delete(messageTemplateGroupId: string): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }
}
