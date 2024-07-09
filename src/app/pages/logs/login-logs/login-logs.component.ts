import { Component, OnInit } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';

import { TplSearchBarComponent } from '@site/app/components/layout/tpl-search-bar/tpl-search-bar.component';
import { UserSelectComponent } from '@site/app/components/form/user-select/user-select.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import moment from 'moment';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LoginLog } from '@site/app/define/logs/login-log';
import { LoginLogService } from '@site/app/services/logs/login-log.service';

@Component({
  selector: 'app-login-logs',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzPopconfirmModule,
    NzTableModule,
    NzDatePickerModule,
    NzSelectModule,

    TplSearchBarComponent,
    UserSelectComponent

  ],
  templateUrl: './login-logs.component.html',
  styleUrl: './login-logs.component.css'
})
export class LoginLogsComponent implements OnInit {

  loginTime: (Date | null)[] = [];

  searchForm = this.formBuilder.group({
    userId: [''],
    loginTimeStart: [''],
    loginTimeEnd: [''],
    loginIp: [''],
    loginPlatform: [''],
    loginType: ['']
  });

  logs: LoginLog[] = [];
  logTableLoading = false;
  logTableOptions = {
    total: 0,
    page: 1,
    pageSize: 15
  };

  constructor(private formBuilder: NonNullableFormBuilder, private loginLogService: LoginLogService) {
  }

  search() {
    this.logTableOptions.page = 1;
    this.loadLogs();
  }

  loadLogs() {
    this.logTableLoading = true;
    this.loginLogService.getLoginLogs({
      ...this.searchForm.value,
      page: this.logTableOptions.page,
      pageSize: this.logTableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success) {
          this.logs = res.data || [];
          this.logTableOptions.total = res.total || 0;
        }
        this.logTableLoading = false;
      },
      error: () => this.logTableLoading = false
    });
  }

  onLoginTimeChange(event: (Date | null)[]) {
    if (event && event.length == 1) {
      this.searchForm.patchValue({
        loginTimeStart: moment(event[0]).set({hour: 0, minute: 0, second: 0}).format('YYYY-MM-DD HH:mm:ss') || ''
      });
    } else if (event && event.length == 2) {
      this.searchForm.patchValue({
        loginTimeStart: moment(event[0]).set({hour: 0, minute: 0, second: 0}).format('YYYY-MM-DD HH:mm:ss') || '',
        loginTimeEnd: moment(event[1]).set({hour: 23, minute: 59, second: 59}).format('YYYY-MM-DD HH:mm:ss') || ''
      });
    }
  }

  ngOnInit(): void {
    this.loadLogs();
  }
}
