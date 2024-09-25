import { Injectable } from '@angular/core';
import { delay, Observable, of } from "rxjs";
import { ResponseBean } from "@site/app/define/sys/response";
import { DictionaryListVo } from "@site/app/define/settings/dictionary";
import {
  MessageTemplateGroupAddDto,
  MessageTemplateGroupListVo, MessageTemplateGroupUpdateDto
} from "@site/app/define/message/message-template-group";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageTemplateGroupService {

  constructor(private http: HttpClient) { }

  findMessageTemplateGroups(): Observable<ResponseBean<MessageTemplateGroupListVo[]>> {
    return this.http.get<ResponseBean<MessageTemplateGroupListVo[]>>('/api/message-template-group/findAll');
    /*return of({
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
    }).pipe(delay(1000))*/
  }

  add(addDto: MessageTemplateGroupAddDto): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/message-template-group/add', addDto);
  }

  update(updateDto: MessageTemplateGroupUpdateDto): Observable<ResponseBean<void>> {
    return this.http.put<ResponseBean<void>>('/api/message-template-group/update', updateDto);
  }

  delete(messageTemplateGroupId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/message-template-group/delete/${messageTemplateGroupId}`)
  }
}
