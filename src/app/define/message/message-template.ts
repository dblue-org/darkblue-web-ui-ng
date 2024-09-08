import { FormControl } from "@angular/forms";

export interface MessageTemplateListVo {
  messageTemplateId: string
  messageTemplateCode: string
  messageTemplateName: string
  messageTitle: string
  messageContent: string
  messageTemplateGroupId: string
  messageTemplateGroupName: string
  createTime: string
}

export interface MessageTemplateAddDto {
  messageTemplateCode: string
  messageTemplateName: string
  messageTitle: string
  messageContent: string
  messageTemplateGroupId: string
}

export interface MessageTemplateUpdateDto {
  messageTemplateId: string
  messageTemplateCode: string
  messageTemplateName: string
  messageTitle: string
  messageContent: string
}

export interface MessageTemplateQueryDto {
  messageTemplateCode?: string
  messageTemplateName?: string
  messageTemplateGroupId?: string
  page: number
  pageSize: number
}

export interface MessageTemplateLink {
  routeType: number,
  routeLink: string
}

export interface MessageTemplateActionMacro {
  macroCode: string
  macroName: string
  macroClass: string
}

export interface MessageTemplateAction {
  actionId: string
  actionName: string
  actionMark: string
  actionType: number // 1-路由跳转；2-宏
  actionMatchState: number
  actionShowCondition: string
  macroCode?: string
  links?: MessageTemplateLink[]
}

export const messageTypes = [
  {value: 1, label: '通知'},
  {value: 2, label: '待办'},
]

export const routePlatforms = [
  {value: 1, label: 'PC'},
  {value: 2, label: 'Android'},
  {value: 3, label: 'IOS'},
  {value: 4, label: '小程序'},
  {value: 5, label: 'H5'},
]


