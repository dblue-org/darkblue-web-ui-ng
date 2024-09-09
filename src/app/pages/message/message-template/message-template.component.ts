import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TwoColumnComponent } from "@site/app/components/layout/two-column/two-column.component";
import {
  MessageTemplateGroupComponent
} from "@site/app/pages/message/message-template-group/message-template-group.component";
import { TwoColumnSiderDirective } from "@site/app/components/layout/two-column/two-column-sider.directive";
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { NzInputModule } from "ng-zorro-antd/input";
import { TplSearchBarComponent } from "@site/app/components/layout/tpl-search-bar/tpl-search-bar.component";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { PermIfDirective } from "@site/app/directives/perm-if.directive";
import { CommonModule } from "@angular/common";
import { BoxContainerComponent } from "@site/app/components/layout/box-container/box-container.component";
import { MessageTemplateListVo } from "@site/app/define/message/message-template";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzTableModule } from "ng-zorro-antd/table";
import { Router, RouterLink } from "@angular/router";
import { MessageTemplateGroupListVo } from "@site/app/define/message/message-template-group";
import { MessageTemplateService } from "@site/app/services/message/message-template.service";
import { group } from "@angular/animations";

@Component({
  selector: 'app-message-template',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzPopconfirmModule,

    TwoColumnComponent,
    MessageTemplateGroupComponent,
    TwoColumnSiderDirective,

    TplSearchBarComponent,
    PermIfDirective,
    BoxContainerComponent,
    RouterLink,
  ],
  templateUrl: './message-template.component.html',
  styleUrl: './message-template.component.css'
})
export class MessageTemplateComponent {

  searchForm = this.fb.group({
    messageTemplateCode: [''],
    messageTemplateName: [''],
    messageTemplateGroupId: ['']
  });
  messageTemplates: MessageTemplateListVo[] = [];
  tableOptions = {
    total: 0,
    page: 1,
    pageSize: 15
  };
  tableLoading = false;
  deleteLoading = false;
  stateLoading = false;
  selectedGroup?: MessageTemplateGroupListVo;


  constructor(private fb: NonNullableFormBuilder, private messageTemplateService: MessageTemplateService,
              private router: Router) {
  }

  search() {
    this.tableOptions.page = 1;
    this.loadMessageTemplates();
  }

  loadMessageTemplates() {
    this.tableLoading = true;
    this.messageTemplateService.findMessageTemplates({
      ...this.searchForm.value,
      page: this.tableOptions.page,
      pageSize: this.tableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success) {
          this.messageTemplates = res.data || [];
          this.tableOptions.total = res.total || 0;
        }
      },
      complete: () => this.tableLoading = false
    })
  }

  onGroupSelected(group: MessageTemplateGroupListVo) {
    this.selectedGroup = group;
    this.searchForm.patchValue({
      messageTemplateGroupId: group.messageTemplateGroupId
    })
    this.loadMessageTemplates();

  }

  showEditModal(data: MessageTemplateListVo) {

  }

  delete(messageTemplateId: string) {

  }

}
