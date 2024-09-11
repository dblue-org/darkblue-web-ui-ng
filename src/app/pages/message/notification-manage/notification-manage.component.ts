import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { TplSearchBarComponent } from "@site/app/components/layout/tpl-search-bar/tpl-search-bar.component";
import { BoxContainerComponent } from "@site/app/components/layout/box-container/box-container.component";
import { RouterLink } from "@angular/router";
import { NotificationListVo } from "@site/app/define/message/notification";
import { NotificationService } from "@site/app/services/message/notification.service";
import { NzMessageService } from "ng-zorro-antd/message";
import {
  MessageTemplateGroupSelectComponent
} from "@site/app/components/form/message-template-group-select/message-template-group-select.component";
import { UserSelectComponent } from "@site/app/components/form/user-select/user-select.component";
import { BooleanSelectComponent } from "@site/app/components/form/boolean-select/boolean-select.component";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import moment from 'moment';
import { PermIfDirective } from "@site/app/directives/perm-if.directive";
import { NzGridModule } from "ng-zorro-antd/grid";

@Component({
  selector: 'app-notification-manage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,

    NzTableModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule,
    NzDatePickerModule,
    NzBadgeModule,
    NzGridModule,

    TplSearchBarComponent,
    BoxContainerComponent,
    MessageTemplateGroupSelectComponent,
    UserSelectComponent,
    BooleanSelectComponent,
  ],
  templateUrl: './notification-manage.component.html',
  styleUrl: './notification-manage.component.css'
})
export class NotificationManageComponent implements OnInit {

  searchForm = this.formBuilder.group({
    moduleId: [''],
    toUser: [''],
    serviceCode: [''],
    notificationTitle: [''],
    isRead: [undefined],
    createTime: [[]]
  })

  notifications: NotificationListVo[] = []
  tableOptions = {
    total: 0,
    page: 1,
    pageSize: 15
  };
  tableLoading = false;
  deleteLoading = false;


  constructor(private formBuilder: NonNullableFormBuilder, private notificationService: NotificationService,
              private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.loadNotifications()
  }

  search() {
    this.tableOptions.page = 1;
    this.loadNotifications();
  }

  loadNotifications() {
    this.tableLoading = true;
    this.notifications = [];

    const params: any = {
      ...this.searchForm.value,
      page: this.tableOptions.page,
      pageSize: this.tableOptions.pageSize
    }

    const createTime: Date[] | undefined = this.searchForm.value.createTime;
    if (createTime) {
      params.createTimeStart = createTime[0] ? moment(createTime[0]).format('YYYY-MM-DD') : ''
      params.createTimeEnd = createTime[1] ? moment(createTime[1]).format('YYYY-MM-DD') : ''
    }

    delete params.createTime;

    this.notificationService.findByPage(params).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.notifications = res.data;
          this.tableOptions.total = res.total || 0;
        }
      },
      complete: () => this.tableLoading = false
    })
  }

  delete(notificationId: string | string[]) {
    this.deleteLoading = true;
    this.notificationService.delete(notificationId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('通知已删除');
          this.loadNotifications();
        }
      },
      complete: () => this.deleteLoading = false
    });
  }

}
