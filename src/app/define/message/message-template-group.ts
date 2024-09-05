export interface MessageTemplateGroupListVo {
  messageTemplateGroupId: string
  messageTemplateGroupName: string
  createTime: string
}

export interface MessageTemplateGroupAddDto {
  messageTemplateGroupName: string
}

export interface MessageTemplateGroupUpdateDto {
  messageTemplateGroupId: string
  messageTemplateGroupName: string
}
