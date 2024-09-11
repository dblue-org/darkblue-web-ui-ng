import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { TplSearchBarComponent } from "@site/app/components/layout/tpl-search-bar/tpl-search-bar.component";
import { BoxContainerComponent } from "@site/app/components/layout/box-container/box-container.component";
import {
  MessageTemplateGroupSelectComponent
} from "@site/app/components/form/message-template-group-select/message-template-group-select.component";
import { UserSelectComponent } from "@site/app/components/form/user-select/user-select.component";
import { BooleanSelectComponent } from "@site/app/components/form/boolean-select/boolean-select.component";
import { NzMessageService } from "ng-zorro-antd/message";
import moment from "moment/moment";
import { NzGridModule } from "ng-zorro-antd/grid";
import { TodoListVo } from "@site/app/define/message/todo";
import { TodoService } from "@site/app/services/message/todo.service";
import { NzSelectModule } from "ng-zorro-antd/select";

@Component({
  selector: 'app-todo-manage',
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
    NzSelectModule,

    TplSearchBarComponent,
    BoxContainerComponent,
    MessageTemplateGroupSelectComponent,
    UserSelectComponent,
    BooleanSelectComponent,
  ],
  templateUrl: './todo-manage.component.html',
  styleUrl: './todo-manage.component.css'
})
export class TodoManageComponent implements OnInit {

  searchForm = this.formBuilder.group({
    moduleId: [''],
    toUser: [''],
    serviceCode: [''],
    totoTitle: [''],
    state: [''],
    createTime: [[]]
  })

  todoList: TodoListVo[] = []
  tableOptions = {
    total: 0,
    page: 1,
    pageSize: 15
  };
  tableLoading = false;
  deleteLoading = false;


  constructor(private formBuilder: NonNullableFormBuilder, private todoService: TodoService,
              private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.loadTodoList()
  }

  search() {
    this.tableOptions.page = 1;
    this.loadTodoList();
  }

  loadTodoList() {
    this.tableLoading = true;
    this.todoList = [];

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

    this.todoService.findByPage(params).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.todoList = res.data;
          this.tableOptions.total = res.total || 0;
        }
      },
      complete: () => this.tableLoading = false
    })
  }

  delete(notificationId: string | string[]) {
    this.deleteLoading = true;
    this.todoService.delete(notificationId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('通知已删除');
          this.loadTodoList();
        }
      },
      complete: () => this.deleteLoading = false
    });
  }

}
