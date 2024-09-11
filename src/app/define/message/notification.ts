import { PageParams } from "@site/app/define/common";

export interface NotificationListVo {
  notificationId: string
  notificationTitle: string
  notificationContent?: string
  routerLink?: string
  moduleId: string
  moduleName: string
  serviceId: string
  serviceCode: string
  toUserId: string
  toUserName: string
  isRead: boolean
  createTime: string
  readTime?: string
}

export interface NotificationStatisticsVo {
  totalCount: number
  readNum: number
  unReadNum: number
  readRate: number
}

export interface NotificationQueryDto extends PageParams {
  moduleId?: string
  toUser?: string
  serviceCode?: string
  notificationTitle?: string
  isRead?: boolean
  createTimeStart?: string
  createTimeEnd?: string
}
