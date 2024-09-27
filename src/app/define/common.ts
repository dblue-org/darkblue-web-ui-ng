export interface PageParams {
  page: number
  pageSize: number
}

export interface TableOptions {
  total: number
  page: number
  pageSize: number
}

export interface RouterLinkTabItem {
  name: string
  routerLink: string
  queryParams: any,
  closeable: boolean
}

export interface PermConfig {
  [key: string]: string
}

export interface GroupPermConfig {
  add: string
  update: string
  delete: string
}

export interface EnumValue {
  value: number;
  label: string
}
