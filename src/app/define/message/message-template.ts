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
  messageTemplateGroupId: string
}

export interface MessageTemplateQueryDto {
  messageTemplateCode?: string
  messageTemplateName?: string
  messageTemplateGroupId?: string
  page: number
  pageSize: number
}
