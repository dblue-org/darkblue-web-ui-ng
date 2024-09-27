import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { DictionaryListVo } from '@site/app/define/settings/dictionary';
import {
  MessageTemplateGroupAddDto,
  MessageTemplateGroupListVo, MessageTemplateGroupUpdateDto
} from '@site/app/define/message/message-template-group';
import {
  MessageTemplateActionMacro,
  MessageTemplateAddDto, MessageTemplateDetailsVo,
  MessageTemplateListVo, MessageTemplateQueryDto,
  MessageTemplateUpdateDto
} from '@site/app/define/message/message-template';
import { HttpClient } from '@angular/common/http';
import { EnumValue } from '@site/app/define/common';

@Injectable({
  providedIn: 'root'
})
export class MessageTemplateService {

  constructor(private http: HttpClient) {
  }

  findMessageTemplates(params: MessageTemplateQueryDto): Observable<ResponseBean<MessageTemplateListVo[]>> {
    return this.http.get<ResponseBean<MessageTemplateListVo[]>>('/api/message-template/findByPage', {
      params: {
        ...params
      }
    });
  }

  add(addDto: MessageTemplateAddDto): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/message-template/add', addDto);
  }

  update(updateDto: MessageTemplateUpdateDto): Observable<ResponseBean<void>> {
    return this.http.put<ResponseBean<void>>('/api/message-template/update', updateDto);
  }

  delete(messageTemplateId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/message-template/delete/${messageTemplateId}`);
  }

  getMacros(): Observable<ResponseBean<MessageTemplateActionMacro[]>> {
    return this.http.get<ResponseBean<MessageTemplateActionMacro[]>>('/api/message-template/macro/findAll');
  }

  getRouterTypes(): Observable<ResponseBean<EnumValue[]>> {
    return this.http.get<ResponseBean<EnumValue[]>>('/api/message-template/getRouterTypes');
  }

  getDetails(messageTemplateId: string, withVars: boolean): Observable<ResponseBean<MessageTemplateDetailsVo>> {
    return this.http.get<ResponseBean<MessageTemplateDetailsVo>>(`/api/message-template/getDetails/${messageTemplateId}`,{
      params: {
        withVars
      }
    });
  }
}
