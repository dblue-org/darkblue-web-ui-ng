import { PageParams } from '@site/app/define/common';

export interface Position {
  positionId: string
  positionCode: string
  positionName: string
  userNums?: number,
  isEnable: boolean
  isBuiltIn: boolean
  createTime: string
}

export interface SimplePosition {
  positionId: string
  positionCode: string
  positionName: string
}

export interface PositionSearchForm extends PageParams {
  positionCode?: string
  positionName?: string
  isEnable?: boolean
  isBuiltIn?: boolean
}

export interface PositionUsersQueryDto extends PageParams {
  positionId: string
}
