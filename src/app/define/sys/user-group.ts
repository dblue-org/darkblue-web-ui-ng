import { PageParams } from '@site/app/define/common';

export interface UserGroup {
  userGroupId: string
  userGroupName: string
  userNum?: number
  sortNum: number
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
  sortNum: number
  isEnable: boolean
  createTime: string
}

export interface UserGroupRefQueryDto extends PageParams{
  userGroupId: string
}
