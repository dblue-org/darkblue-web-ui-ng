import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzListModule } from "ng-zorro-antd/list";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { MessageTemplateGroupListVo } from "@site/app/define/message/message-template-group";
import { GroupPanelComponent } from "@site/app/components/layout/group-panel/group-panel.component";
import { MessageTemplateGroupService } from "@site/app/services/message/message-template-group.service";
import {
  MessageTemplateGroupEditModalComponent
} from "@site/app/pages/message/message-template-group/message-template-group-edit-modal/message-template-group-edit-modal.component";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: 'app-message-template-group',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    NzListModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzSpinModule,
    GroupPanelComponent,
    MessageTemplateGroupEditModalComponent
  ],
  templateUrl: './message-template-group.component.html',
  styleUrl: './message-template-group.component.css'
})
export class MessageTemplateGroupComponent implements OnInit {

  @Output() onSelected = new EventEmitter<MessageTemplateGroupListVo>();
  @ViewChild('messageTemplateGroupEditModalComponent') messageTemplateGroupEditModalComponent!: MessageTemplateGroupEditModalComponent;

  groups: MessageTemplateGroupListVo[] = [];
  selected?: MessageTemplateGroupListVo;
  loading = false;

  constructor(private messageTemplateGroupService: MessageTemplateGroupService, private modalService: NzModalService,
              private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.loadGroups()
  }

  loadGroups() {
    this.loading = true;
    this.messageTemplateGroupService.findMessageTemplateGroups().subscribe({
      next: (res) => {
        if (res.success) {
          this.groups = res.data || []
          if (this.groups && this.groups.length > 0) {
            this.selectGroup(this.groups[0]);
          }
        }
      },
      complete: () => this.loading = false
    })
  }

  showAddModal() {
    this.messageTemplateGroupEditModalComponent?.showAddModal();
  }

  showEditModal() {
    this.messageTemplateGroupEditModalComponent.showUpdateModal(this.selected)
  }

  doDelete() {
    const messageTemplateGroupId = this.selected?.messageTemplateGroupId;
    if (messageTemplateGroupId) {
      this.modalService.confirm({
        nzTitle: '消息模板组删除',
        nzContent: '是否确认删除此消息模板组？请确保消息模板组下没有消息模板，否则会删除失败。',
        nzOnOk: () => {
          this.messageTemplateGroupService.delete(messageTemplateGroupId).subscribe(res => {
            if (res.success) {
              this.messageService.success('消息模板组已删除');
              this.loadGroups();
            }
          });
        }
      });
    }
  }

  selectGroup(item: MessageTemplateGroupListVo) {
    this.selected = item;
    this.onSelected.emit(item);
  }
}
