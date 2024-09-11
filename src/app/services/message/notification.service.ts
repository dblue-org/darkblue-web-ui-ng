import { Injectable } from '@angular/core';
import { NotificationListVo, NotificationQueryDto } from "@site/app/define/message/notification";
import { delay, Observable, of } from "rxjs";
import { ResponseBean } from "@site/app/define/sys/response";
import { MessageTemplateListVo } from "@site/app/define/message/message-template";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  findByPage(params: NotificationQueryDto): Observable<ResponseBean<NotificationListVo[]>> {
    console.log(params)
    return of({
      success: true,
      data: [
        {
          notificationId: '1524654948974986',
          notificationTitle: '有新合同签署完成',
          moduleId: '15465486789',
          moduleName: '合同',
          serviceId: '44987484564998798',
          serviceCode: 'HT-E-2024000099',
          toUserId: '000000',
          toUserName: '张志远',
          isRead: false,
          createTime: '2024-09-10 15:30:27'
        }
      ],
      total: 1
    }).pipe(delay(500))
  }

  delete(notificationId: string | string[]): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }
}
