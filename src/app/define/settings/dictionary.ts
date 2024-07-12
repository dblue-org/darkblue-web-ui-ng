import { BasicTreeTableItem } from '@site/app/components/basic-tree-table';
import { PageParams } from '@site/app/define/common';

export interface DictionaryListVo {
  dictionaryId: string
  dictionaryCode: string
  dictionaryName: string
  dictionaryType: number
  createTime: string
}

export interface DictionaryAddDto {
  dictionaryCode: string
  dictionaryName: string
  dictionaryType: number
}

export interface DictionaryUpdateDto {
  dictionaryId: string
  dictionaryCode: string
  dictionaryName: string
}

export interface DictionaryItemListVo extends BasicTreeTableItem {
  dictionaryItemId: string
  code: number
  name: string
  extension: string
  parentId: string
  sortNum: number
  itemLevel: number
  isEnable: boolean
  createTime: string
}

export interface DictionaryItemPageQueryDto extends PageParams {
  dictionaryId: string
  code?: number
  name?: string
  extension?: string
}

export interface DictionaryItemAddDto {
  code: number
  name: string
  extension?: string
  parentId?: string
  orderNum: number
}

export interface DictionaryItemUpdateDto {
  dictionaryItemId: string
  code: number
  name: string
  extension?: string
  parentId?: string
  orderNum: number
}

export interface SimpleDictionaryItemListVo {
  dictionaryItemId: string
  code: number
  name: string
  parentId?: string
}

export interface DictionaryMixedVo {
  dictionaryId: string
  dictionaryCode: string
  dictionaryName: string
  dictionaryType: number
  items: SimpleDictionaryItemListVo[]
}
