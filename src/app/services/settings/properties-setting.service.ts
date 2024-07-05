import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { Property, PropertySearchForm, propertyType, EnumItem } from '@site/app/define/settings/property';

@Injectable({
  providedIn: 'root'
})
export class PropertiesSettingService {

  constructor() { }

  getPropertyTypes(): Observable<ResponseBean<EnumItem[]>> {
    return of({
      success: true,
      data: propertyType
    })
  }

  getAllProperties(searchFrom: PropertySearchForm): Observable<ResponseBean<Property[]>> {
    return of({
      success: true,
      data: [
        {
          propertyId: '001',
          propertyCode: 'user.default.password',
          propertyName: '用户默认密码',
          remark: '重置用户密码时',
          type: 1,
          defaultValue: '123456',
          value: '123456',
          createTime: '2024-05-01 14:55:21'
        },
        {
          propertyId: '002',
          propertyCode: 'user.password.expire',
          propertyName: '密码有效期',
          remark: '密码有效期，到期后会提示需要修改密码',
          type: 2,
          valueScope: {min: 30, max: 365},
          defaultValue: 30,
          value: 60,
          unit: '天',
          createTime: '2024-05-01 14:55:21'
        },
        {
          propertyId: '003',
          propertyCode: 'select.datetype.start',
          propertyName: '日期选择起始日期',
          remark: '设置系统中统计相关功能的日期筛选项中的起始日期',
          type: 3,
          defaultValue: '2024-01-01',
          value: '2024-05-01',
          createTime: '2024-05-01 14:55:21'
        },
        {
          propertyId: '004',
          propertyCode: 'allowed.register',
          propertyName: '是否允许注册',
          remark: '是否开发系统注册功能',
          type: 5,
          defaultValue: true,
          value: false,
          createTime: '2024-05-01 14:55:21'
        },
        {
          propertyId: '005',
          propertyCode: 'background.color',
          propertyName: '背景颜色',
          remark: '背景颜色',
          type: 6,
          defaultValue: 'white',
          value: '#ccc',
          createTime: '2024-05-01 14:55:21'
        },
        {
          propertyId: '006',
          propertyCode: 'theme.list',
          propertyName: '主题',
          remark: '主题',
          type: 7,
          valueScope: ['dust', 'cyan', 'dark', 'light', 'polar', 'geek', 'purple'] ,
          defaultValue: 'light',
          value: 'light',
          createTime: '2024-05-01 14:55:21'
        },
        {
          propertyId: '007',
          propertyCode: 'user.default.type',
          propertyName: '默认用户类型',
          remark: '用户注册时的默认用户类型',
          type: 8,
          valueScope: [
            {value: 1, label: '普通用户'},
            {value: 2, label: '基础会员'},
            {value: 3, label: '永久会员'},
          ] ,
          defaultValue: 1,
          value: 2,
          createTime: '2024-05-01 14:55:21'
        },
      ],
      total: 7
    }).pipe(delay(1000))
  }

  add(property: Property): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  update(property: Property): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }

  delete(propertyId: string): Observable<ResponseBean<void>> {
    return of({
      success: true
    }).pipe(delay(1000))
  }
}
