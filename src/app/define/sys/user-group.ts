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
