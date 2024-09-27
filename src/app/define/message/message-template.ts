import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

export interface MessageTemplateListVo {
  messageTemplateId: string
  messageTemplateCode: string
  messageTemplateName: string
  messageTemplateType: number
  serviceCodeTpl: string
  messageTitleTpl: string
  messageContentTpl: string
  messageTemplateGroupId: string
  messageTemplateGroupName: string
  createTime: string
}

export interface MessageTemplateTagDto {
  tagName: string
  showConditional: string
}

export interface MessageTemplateAddDto {
  messageTemplateCode: string
  messageTemplateName: string
  messageTemplateType: number
  serviceCodeTpl: string
  messageTitleTpl: string
  messageContentTpl: string
  messageTemplateGroupId: string
  directRouters?: MessageTemplateLink[]
  tags?: MessageTemplateTagDto[]
  actions?: MessageTemplateAction[]
}

export interface MessageTemplateUpdateDto {
  messageTemplateId: string
  messageTemplateCode: string
  messageTemplateName: string
  serviceCodeTpl: string
  messageTitleTpl: string
  messageContentTpl: string
  directRouters?: MessageTemplateLink[]
  tags?: MessageTemplateTagDto[]
  actions?: MessageTemplateAction[]
}

export interface MessageTemplateQueryDto {
  messageTemplateCode?: string
  messageTemplateName?: string
  messageTemplateGroupId?: string
  page: number
  pageSize: number
}

export interface MessageTemplateLink {
  routerType: number,
  routerLink: string
}

export interface MessageTemplateActionMacro {
  macroCode: string
  macroName: string
  macroClass: string
}

export interface MessageTemplateAction {
  messageTemplateActionId?: string
  actionName: string
  actionMark: string
  actionType: number // 1-路由跳转；2-宏
  matchState: number
  showConditional: string
  macroCode?: string
  routes?: MessageTemplateLink[]
}

export interface MessageTemplateTagVo {
  messageTemplateTagId: string
  tagName: string
  showConditional: string
}

export interface MessageTemplateLinkVo {
  routerType: number,
  routerTypeName: string,
  routerLink: string
}

export interface MessageTemplateDirectRouteVo extends MessageTemplateLinkVo {
  messageTemplateDirectRouteId: string
}

export interface MessageTemplateActionRouteVo extends MessageTemplateLinkVo {
  messageTemplateActionRouteId: string
}
export interface MessageTemplateActionVo {
  messageTemplateActionId?: string
  actionName: string
  actionMark: string
  actionType: number // 1-路由跳转；2-宏
  matchState: number
  showConditional: string
  macroCode?: string
  routes?: MessageTemplateActionRouteVo[]
}

export interface MessageTemplateDetailsVo {
  messageTemplateId: string
  messageTemplateCode: string
  messageTemplateName: string
  messageTemplateType: number
  serviceCodeTpl: string
  messageTitleTpl: string
  messageContentTpl: string
  messageTemplateGroupId: string
  messageTemplateGroupName: string
  createTime: string
  directRouters?: MessageTemplateDirectRouteVo[]
  tags?: MessageTemplateTagVo[]
  actions?: MessageTemplateActionVo[]
  variables: NzTreeNodeOptions[]
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
