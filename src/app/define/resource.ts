import { SimplePermission } from '@site/app/define/permission';

export interface ResourceGroup {
  resourceGroupId: string
  resourceGroupName: string
  createTime?: string
}

export interface ResourceGroupForm {
  resourceGroupId?: string
  resourceGroupName: string
}

export interface Controller {
  controller: string
  tagName: string
  mappings: Mapping[]
}

export interface Mapping {
  resourceName: string
  resourceUrl: string
  requestMethod?: string
  controller?: string
  method?: string
}

export interface Resource extends Mapping{
  resourceId: string
  isAuthedAccess: boolean
  createTime: string
  permissions: SimplePermission[]
}

export interface ResourceSearchForm {
  resourceGroupId?: string
  resourceName?: string
  resourceUrl?: string
  controller?: string
  method?: string
  isAuthedAccess?: boolean
  page: number
  pageSize: number
}
