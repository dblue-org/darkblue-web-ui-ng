import { SimplePermission } from '@site/app/define/sys/permission';

export interface ResourceGroup {
  resourceGroupId: string
  groupName: string
  platform: number;
  sortNum: number;
  createTime?: string
}

export interface ResourceGroupForm {
  resourceGroupId?: string
  groupName: string
}

export interface Controller {
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

export interface CheckedMapping extends Mapping {
  checked: boolean;
  isAuthedAccess: boolean;
}

export interface ResourceVo extends Mapping{
  resourceId: string
  isAuthedAccess: boolean
  createTime: string
}

export interface Resource extends Mapping{
  resourceId: string
  isAuthedAccess: boolean
  createTime: string
  isInvalid?: boolean;
  permissions: SimplePermission[]
}

export interface SimpleResource {
  resourceId: string
  resourceName: string
  requestMethod?: string
  resourceUrl: string
}

export interface ResourceSearchForm {
  resourceGroupId?: string
  resourceName?: string
  resourceUrl?: string
  controller?: string
  method?: string
  isAuthedAccess?: boolean
  platform?: number
  page: number
  pageSize: number
}

export interface ResourceAddDto extends Mapping {
  isAuthedAccess: boolean;
}

export interface ResourceBatchAddDto {
  resourceGroupId: string;
  platform: number;
  mappings: ResourceAddDto[];
}

export interface ResourceCheckVo extends ResourceVo {
  resourceGroupId: string;
  resourceGroupName: string;
}

export interface PermissionResourceVo extends Mapping {
  resourceId: string;
  createTime: string;
  resourceGroupId?: string;
}
