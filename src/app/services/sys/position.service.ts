import { Injectable } from '@angular/core';
import { Position, PositionSearchForm } from '@site/app/define/sys/position';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { User } from '@site/app/define/sys/user';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor() { }

  findByPage(formData: PositionSearchForm): Observable<ResponseBean<Position[]>> {
    return of({
      success: true,
      data: this.mockPositions()
    }).pipe(delay(1000))
  }

  findAll(keyword: string): Observable<ResponseBean<Position[]>> {
    return of({
      success: true,
      data: this.mockPositions()
    })
  }

  add(position: Position): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  update(position: Position): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  delete(positionId: string): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  enable(positionId: string): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  disable(positionId: string): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  getDetails(positionId: string): Observable<ResponseBean<Position>> {
    return of({
      success: true,
      data: {
        positionId: '111111',
        positionCode: 'AAAAA',
        positionName: '职位测试',
        userNum: 10,
        isEnable: true,
        isBuiltIn: false,
        createTime: '2024-05-06 14:20:22'
      }
    }).pipe(delay(1000))
  }

  getUsers(positionId: string): Observable<ResponseBean<User[]>> {
    return of({
      success: true,
      data: [
        {
          userId: '001',
          username: 'zhangsan',
          name: '张三',
          phoneNumber: '13888888888',
          deptId: 'd01',
          deptName: '开发部',
          roles: [{roleId: '0010001', roleName: '管理员'}],
          isEnable: true
        }
      ],
      total: 1,
    }).pipe(delay(1000))
  }

  mockPositions(): Position[] {
    return [
      {
        positionId: '111111',
        positionCode: 'AAAAA',
        positionName: '职位测试',
        userNum: 10,
        isEnable: true,
        isBuiltIn: true,
        createTime: '2024-05-06 14:20:22'
      },
      {
        positionId: '222222',
        positionCode: 'BBBBBB',
        positionName: '职位测试1',
        userNum: 10,
        isEnable: true,
        isBuiltIn: false,
        createTime: '2024-05-06 14:20:22'
      },
    ]
  }
}
