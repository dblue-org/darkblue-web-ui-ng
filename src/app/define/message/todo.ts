import { PageParams } from "@site/app/define/common";

export interface TodoListVo {
  todoId: string
  todoTitle: string
  todoType: number
  moduleId: string
  moduleName: string
  serviceId: string
  serviceCode: string
  toUserId: string
  toUserName: string
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
