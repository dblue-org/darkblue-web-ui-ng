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
