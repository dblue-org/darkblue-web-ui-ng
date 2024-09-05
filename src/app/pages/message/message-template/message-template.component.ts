import { Component } from '@angular/core';
import { TwoColumnComponent } from "@site/app/components/layout/two-column/two-column.component";
import {
  MessageTemplateGroupComponent
} from "@site/app/pages/message/message-template-group/message-template-group.component";
import { TwoColumnSiderDirective } from "@site/app/components/layout/two-column/two-column-sider.directive";
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { NzInputDirective, NzInputModule } from "ng-zorro-antd/input";
import { TplSearchBarComponent } from "@site/app/components/layout/tpl-search-bar/tpl-search-bar.component";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { PermIfDirective } from "@site/app/directives/perm-if.directive";
import { CommonModule } from "@angular/common";
import { UserPageListVo } from "@site/app/define/sys/user";
import { BoxContainerComponent } from "@site/app/components/layout/box-container/box-container.component";
import { MessageTemplateListVo } from "@site/app/define/message/message-template";
import { NzPopconfirmDirective } from "ng-zorro-antd/popconfirm";
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTheadComponent,
  NzThMeasureDirective, NzTrDirective
} from "ng-zorro-antd/table";
import { RouterLink } from "@angular/router";
import { MessageTemplateGroupListVo } from "@site/app/define/message/message-template-group";
import { MessageTemplateService } from "@site/app/services/message/message-template.service";

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

    TwoColumnComponent,
    MessageTemplateGroupComponent,
    TwoColumnSiderDirective,

    NzInputDirective,
    TplSearchBarComponent,
    PermIfDirective,
    BoxContainerComponent,
    NzPopconfirmDirective,
    NzTableCellDirective,
    NzTableComponent,
    NzTbodyComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTrDirective,
    RouterLink
  ],
  templateUrl: './message-template.component.html',
  styleUrl: './message-template.component.css'
})
export class MessageTemplateComponent {

  searchForm = this.fb.group({
    messageTemplateCode: [''],
    messageTemplateName: [''],
    messageTemplateGroupId: ['']
  })
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


  constructor(private fb: NonNullableFormBuilder, private messageTemplateService: MessageTemplateService) {
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

  showAddModal() {

  }

  showEditModal(data: MessageTemplateListVo) {

  }

  delete(messageTemplateId: string) {

  }
}
