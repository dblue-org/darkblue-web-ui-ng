import { Routes } from '@angular/router';
import { LoginLogsComponent } from '@site/app/pages/logs/login-logs/login-logs.component';
import { OperationLogsComponent } from '@site/app/pages/logs/operation-logs/operation-logs.component';

export const LOGS_ROUTES: Routes = [
  { path: 'login', component: LoginLogsComponent, title: '登录日志', data: {shouldReuse: true}},
  { path: 'operation', component: OperationLogsComponent, title: '操作日志', data: {shouldReuse: true}},
]
