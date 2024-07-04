import { PageParams } from '@site/app/define/common';

export interface LoginLog {
  userId?: string
  name?: string
  loginPlatform: string
  loginType: string
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
