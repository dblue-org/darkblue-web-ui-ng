import { Injectable } from '@angular/core';
import { OperationLog, OperationLogSearchForm } from '@site/app/define/logs/operation-logs';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationLogService {

  constructor(private http: HttpClient) { }

  loadLogs(searchForm: OperationLogSearchForm): Observable<ResponseBean<OperationLog[]>> {
    return this.http.get<ResponseBean<OperationLog[]>>('/api/operation-log/findByPage', {
      params: {
        ...searchForm,
        isError: searchForm.isError != undefined ? searchForm.isError : ''
      }
    })
  }

  getErrorDetails(operationLogId: string):Observable<ResponseBean<string>> {
    return this.http.get<ResponseBean<string>>(`/api/operation-log/getErrorDetails/${operationLogId}`)
  }
}
