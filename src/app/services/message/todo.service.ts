import { Injectable } from '@angular/core';
import { NotificationListVo, NotificationQueryDto } from "@site/app/define/message/notification";
import { delay, Observable, of } from "rxjs";
import { ResponseBean } from "@site/app/define/sys/response";
import { MessageTemplateListVo } from "@site/app/define/message/message-template";
import { TodoListVo, TodoQueryDto } from "@site/app/define/message/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  findByPage(params: TodoQueryDto): Observable<ResponseBean<TodoListVo[]>> {
    console.log(params)
    return of({
      success: true,
      data: [
        {
          todoId: '1524654948974986',
          todoTitle: '河南XXX公司销售合同',
          todoType: 1,
          moduleId: '15465486789',
          moduleName: '合同',
          serviceId: '44987484564998798',
          serviceCode: 'HT-E-2024000099',
          toUserId: '000000',
          toUserName: '张志远',
          state: 1,
          stateName: '未处理',
          serviceState: 'PROCESSING',
          serviceStateName: '审批中',
          createTime: '2024-09-10 15:30:27'
        },
        {
          todoId: '1524654948974986',
          todoTitle: '河南XXX公司采购合同',
          todoType: 2,
          moduleId: '15465486789',
          moduleName: '合同',
          serviceId: '44987484564998798',
          serviceCode: 'HT-B-2024000019',
          toUserId: '000000',
          toUserName: '张志远',
          state: 2,
          stateName: '已处理',
          serviceState: 'COMPLETE',
          serviceStateName: '签署完毕',
          createTime: '2024-09-10 15:30:27'
        }
      ],
      total: 200
    }).pipe(delay(500))
  }

  delete(todoId: string | string[]): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(500))
  }
}
