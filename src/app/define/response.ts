export interface ResponseBean<T> {
  success: boolean,
  errorCode?: string,
  message?: string,
  extension?: any,
  errorDetails?: any,
  data?: T,
  page?: number,
  pageSize?: number,
  totalPage?: number,
  total?: number,
}
