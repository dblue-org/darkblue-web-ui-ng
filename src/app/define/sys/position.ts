import { PageParams } from '@site/app/define/common';

export interface Position {
  positionId: string
  positionCode: string
  positionName: string
  userNum?: number,
  isEnable: boolean
  isBuiltIn: boolean
  createTime: string
}

export interface PositionSearchForm extends PageParams {
  positionCode?: string
  positionName?: string
  isEnable?: boolean
  isBuiltIn?: boolean
}
