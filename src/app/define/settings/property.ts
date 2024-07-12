import { PageParams } from '@site/app/define/common';

export interface EnumItem {
  value: number
  label: string
}

export const propertyType: EnumItem[] = [
  {value: 1, label: '字符串'},
  {value: 2, label: '数值'},
  {value: 3, label: '日期'},
  {value: 4, label: '日期时间'},
  {value: 5, label: '布尔'},
  {value: 6, label: '颜色'},
  {value: 7, label: '列表'},
  {value: 8, label: '枚举'},
]

export interface NumberScope {
  min?: number
  max?: number
}

export interface Property {
  propertyId: string
  propertyCode: string
  propertyName: string
  remark: string
  type: number
  typeName: string
  valueScope?: NumberScope | EnumItem [] | string[]
  defaultValue: any
  value: any
  unit?: string
  createTime?: string
}

export interface PropertySearchForm extends PageParams {
  propertyCode?: string
  propertyName?: string
}

const _propertyTypeMap:Map<number, string> = new Map<number, string>();

propertyType.forEach(o => {
  _propertyTypeMap.set(o.value, o.label);
})

export const propertyTypeMap = _propertyTypeMap;

export function getPropertyType(value: number) {
  return propertyTypeMap.get(value);
}

export function toScopeString(property: Property): string {
  if (!property.valueScope) {
    return '';
  }

  if (property.type == 2) {
    const scope = property.valueScope as NumberScope
    if (scope.min !== undefined || scope.max !== undefined) {
      return (scope.min || '') + ' ~ ' + (scope.max || '')
    }
    return '';
  }

  if (property.type == 7) {
    const scope = property.valueScope as string[]
    return scope.join(',');
  }

  if (property.type == 8) {
    const scope = property.valueScope as EnumItem[]
    const labels: string[] = [];
    scope.forEach(s => {
      labels.push(s.label);
    })
    return labels.join(',')
  }

  return '';
}

export function getEnumLabel(value: any, items: EnumItem[]) {
  for (const item of items) {
    if (item.value == value) {
      return item.label;
    }
  }
  return '';
}
