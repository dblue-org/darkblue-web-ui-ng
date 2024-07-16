import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import moment from 'moment/moment';
import { OperationLogService } from '@site/app/services/logs/operation-log.service';
import { OperationLog } from '@site/app/define/logs/operation-logs';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TplSearchBarComponent } from '@site/app/components/layout/tpl-search-bar/tpl-search-bar.component';
import { UserSelectComponent } from '@site/app/components/form/user-select/user-select.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { IconifyComponent } from '@site/app/components/icon/iconify/iconify.component';
import { ParamsModalComponent } from '@site/app/pages/logs/operation-logs/params-modal/params-modal.component';
import { ExceptionModalComponent } from '@site/app/pages/logs/operation-logs/exception-modal/exception-modal.component';
import { BoxContainerComponent } from '@site/app/components/layout/box-container/box-container.component';

@Component({
  selector: 'app-operation-logs',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzPopconfirmModule,
    NzTableModule,
    NzDatePickerModule,
    NzSelectModule,
    NzTagModule,

    TplSearchBarComponent,
    UserSelectComponent,
    IconifyComponent,
    ParamsModalComponent,
    ExceptionModalComponent,
    BoxContainerComponent
  ],
  templateUrl: './operation-logs.component.html',
  styleUrl: './operation-logs.component.css'
})
export class OperationLogsComponent implements OnInit {

  @ViewChild('paramsModalComponent') paramsModalComponent?: ParamsModalComponent;
  @ViewChild('exceptionModalComponent') exceptionModalComponent?: ExceptionModalComponent;

  operationTime: (Date | null)[] = [];

  searchForm = this.formBuilder.group({
    userId: [''],
    operationName: [''],
    serviceClass: [''],
    serviceMethod: [''],
    isError: [undefined],
    operationTimeStart: [''],
    operationTimeEnd: ['']
  });

  logs: OperationLog[] = [];
  logTableLoading = false;
  logTableOptions = {
    total: 0,
    page: 1,
    pageSize: 15
  };

  constructor(private formBuilder: NonNullableFormBuilder, private logService: OperationLogService) {
  }

  search() {
    this.logTableOptions.page = 1;
    this.loadLogs();
  }

  loadLogs() {
    this.logTableLoading = true;
    this.logService.loadLogs({
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
        operationTimeStart: moment(event[0]).set({hour: 0, minute: 0, second: 0}).format('YYYY-MM-DD HH:mm:ss') || ''
      });
    } else if (event && event.length == 2) {
      this.searchForm.patchValue({
        operationTimeStart: moment(event[0]).set({hour: 0, minute: 0, second: 0}).format('YYYY-MM-DD HH:mm:ss') || '',
        operationTimeEnd: moment(event[1]).set({hour: 23, minute: 59, second: 59}).format('YYYY-MM-DD HH:mm:ss') || ''
      });
    }
  }

  ngOnInit(): void {
    this.loadLogs();
  }

  getConsumingTimeColor(data: OperationLog): string {
    if (data.timeConsuming <= 1000) {
      return 'green'
    } else if (data.timeConsuming <= 3000) {
      return '#faad14'
    } else if (data.timeConsuming <= 30000) {
      return '#cf1322'
    } else {
      return '#5c0011'
    }
  }

  showParams(data: OperationLog) {
    this.paramsModalComponent?.showModal(data);
  }

  showException(data: OperationLog) {
    if (data.operationLogId) {
      this.exceptionModalComponent?.showModal(data.operationLogId);
    }
  }
}
