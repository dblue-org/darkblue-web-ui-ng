import { PageParams } from '@site/app/define/common';

export interface LoginLog {
  loginLogId?:string
  userId?: string
  name?: string
  loginPlatform: number
  loginPlatformName: string
  loginType: number
  loginTypeName: string
  loginTime: string
  loginIp: string
  userAgent: string
}

export interface LoginLogSearchForm extends PageParams {
  userId?: string
  loginPlatform?: string
  loginType?: string
  loginTimeStart?: string
  loginTimeEnd?: string
  loginIp?: string
}
