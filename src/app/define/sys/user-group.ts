import { PageParams } from '@site/app/define/common';

export interface UserGroup {
  userGroupId: string
  userGroupName: string
  userNum?: number
  createTime: string
}

export interface UserGroupSearchForm extends PageParams {
  userGroupName?: string
}

export interface UserGroupAddDto {
  userGroupName: string
  sortNum: number
}

export interface UserGroupUpdateDto extends UserGroupAddDto {
  userGroupId: string
}

export interface UserGroupPageListVo {
  userGroupId: string
  userGroupName: string
  userNum?: number
  isEnable: boolean
  createTime: string
}
