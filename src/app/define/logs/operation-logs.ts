import { PageParams } from '@site/app/define/common';

export interface OperationLog {
  operationLogId?: string
  userId?: string
  name?: string
  operationName: string
  operationTime: string
  serviceClass: string
  serviceMethod: string
  methodParams: any
  result: any
  isError: boolean
  timeConsuming: number
  errorDetails?: string
}

export interface OperationLogSearchForm extends PageParams {
  userId?: string
  operationName?: string
  serviceClass?: string
  serviceMethod?: string
  isError?: boolean
  operationTimeStart?: string
  operationTimeEnd?: string
}
