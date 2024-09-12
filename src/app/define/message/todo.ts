import { PageParams } from "@site/app/define/common";

export interface TodoListVo {
  todoId: string
  todoTitle: string
  todoType: number
  messageType: number
  moduleId: string
  moduleName: string
  serviceId: string
  serviceCode: string
  starter: string
  starterName: string
  toUserId: string
  toUserName: string
  handleUser?: string
  handleUserName?: string
  serviceData?: string
  tags?: string[]
  state: number
  stateName: string
  serviceState: string
  serviceStateName: string
  createTime: string
  readTime?: string
}

export interface TodoStatisticsVo {
  totalCount: number
  completedNum: number
  unCompletedNum: number
  serviceTodoNum: number
  auditTodoNum: number
  completedRate: number
}

export interface TodoQueryDto extends PageParams {
  moduleId?: string
  toUser?: string
  serviceCode?: string
  todoTitle?: string
  state?: number
  createTimeStart?: string
  createTimeEnd?: string
}
