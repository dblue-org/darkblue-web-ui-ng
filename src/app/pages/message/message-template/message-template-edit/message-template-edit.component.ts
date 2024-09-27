import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DetailsOperationBarComponent
} from '@site/app/components/layout/details-operation-bar/details-operation-bar.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageTemplateService } from '@site/app/services/message/message-template.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SectionComponent } from '@site/app/components/layout/section/section.component';
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { IconifyComponent } from "@site/app/components/icon/iconify/iconify.component";
import {
  MessageTemplateAction, MessageTemplateLink,
  MessageTemplateTagDto,
  messageTypes,
  routePlatforms
} from '@site/app/define/message/message-template';
import {
  MessageTemplateActionModalComponent
} from "@site/app/pages/message/message-template/message-template-edit/message-template-action-modal/message-template-action-modal.component";
import { NzTableModule } from "ng-zorro-antd/table";
import { PermIfDirective } from "@site/app/directives/perm-if.directive";
import { RouterLink } from "@angular/router";
import { TabsetStoreService } from '@site/app/services/common/tabset-store.service';
import { EMPTY, Observable, of } from 'rxjs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RouterTypeSelectComponent } from '@site/app/components/form/router-type-select/router-type-select.component';

@Component({
  selector: 'app-message-template-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,

    NzButtonComponent,
    NzFormModule,
    NzGridModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzIconModule,
    NzAlertModule,
    NzTableModule,
    NzToolTipModule,

    SectionComponent,
    DetailsOperationBarComponent,
    IconifyComponent,
    MessageTemplateActionModalComponent,
    PermIfDirective,
    RouterTypeSelectComponent

  ],
  templateUrl: './message-template-edit.component.html',
  styleUrl: './message-template-edit.component.css'
})

export class MessageTemplateEditComponent implements OnInit {
  @Input('messageTemplateGroupId')
  messageTemplateGroupId: string = '';

  @Input('messageTemplateGroupName')
  messageTemplateGroupName: string = '';

  @Input('messageTemplateId')
  messageTemplateId: string = '';

  @ViewChild('messageTemplateActionModalComponent') messageTemplateActionModalComponent!: MessageTemplateActionModalComponent;

  isEdit = false;

  dataForm = this.formBuilder.group({
    messageTemplateId: [undefined],
    messageTemplateName: ['合同', [Validators.required]],
    messageTemplateCode: ['Contract', [Validators.required]],
    messageTemplateType: [2, [Validators.required]],
    serviceCodeTpl: [undefined],
    messageTitleTpl: ['合同：${contractName}', [Validators.required]],
    messageContentTpl: ['66666666', [Validators.required]]
  })

  tags: FormGroup[] = [];
  routers: FormGroup[] = [];
  actions: MessageTemplateAction[] = []

  varDefine = '${变量}';
  messageTemplateTypes = messageTypes;

  constructor(private formBuilder: NonNullableFormBuilder, private messageTemplateService: MessageTemplateService,
              private messageService: NzMessageService, private tabsetStoreService: TabsetStoreService) {
  }

  ngOnInit(): void {
    if (this.messageTemplateId) {
      this.isEdit = true;
      this.loadFormData();
    } else {
      this.isEdit = false;
    }
  }

  addTag(tagData?: MessageTemplateTagDto) {
    const formGroup = this.formBuilder.group({
      tagName: ['', [Validators.required]],
      showConditional: ['', [Validators.required]],
    })
    this.tags.push(formGroup);
    if (tagData) {
      formGroup.patchValue(tagData);
    }
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  addRouter(routerData?: MessageTemplateLink) {
    const formGroup = this.formBuilder.group({
      routerType: [1, [Validators.required]],
      routerLink: ['', [Validators.required]],
    })
    this.routers.push(formGroup);
    if (routerData) {
      formGroup.patchValue(routerData);
    }
  }

  removeRouter(index: number) {
    this.routers.splice(index, 1);
  }

  showAddActionModal() {
    this.messageTemplateActionModalComponent.showAddModal();
  }

  onActionCreateOk(data: MessageTemplateAction) {
    this.actions = [
      ...this.actions,
      data
    ]
  }

  onActionUpdateOk(data: MessageTemplateAction) {
    const actionsCopy = [
      ...this.actions
    ]
    for (let i = 0; i < actionsCopy.length; i++) {
      const action = actionsCopy[i];
      if (action.messageTemplateActionId == data.messageTemplateActionId) {
        actionsCopy[i] = data;
      }
    }
    this.actions = actionsCopy;
  }

  deleteAction(data: MessageTemplateAction) {
    this.actions = this.actions.filter(
      act => act.messageTemplateActionId != data.messageTemplateActionId);
  }

  editAction(data: MessageTemplateAction) {
    this.messageTemplateActionModalComponent.showUpdateModal(data);
  }

  doSubmit() {
    this.valid().subscribe({
      next: () => {
        const data = this.getData();
        if (this.isEdit) {
          this.messageTemplateService.update(data).subscribe({
            next: response => {
              if (response.success) {
                this.messageService.success('消息模板添加成功');
                this.tabsetStoreService.closeActiveTab();
              }
            }
          })
        } else {
          this.messageTemplateService.add(data).subscribe({
            next: response => {
              if (response.success) {
                this.messageService.success('消息模板添加成功');
                this.tabsetStoreService.closeActiveTab();
              }
            }
          })
        }
      }
    })
  }

  loadFormData() {
    this.messageTemplateService.getDetails(this.messageTemplateId, false).subscribe({
      next: response => {
        if (response.success && response.data) {
          const data = response.data;
          this.messageTemplateGroupName = data.messageTemplateGroupName;
          this.dataForm.patchValue(data as any);

          this.actions = data.actions || [];
          if (data.tags && data.tags.length > 0) {
            data.tags.forEach(tag => this.addTag(tag));
          }
          if (data.directRouters && data.directRouters.length > 0) {
            data.directRouters.forEach(router => this.addRouter(router));
          }
        }
      }
    })
  }

  private valid():Observable<any> {
    if (this.dataForm.valid) {
      if (this.isTagValid() && this.isRouterValid() && this.isActionValid()) {
        return of(true);
      } else {
        console.log('验证未通过');
        return EMPTY;
      }
    } else {
      Object.values(this.dataForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      return EMPTY;
    }
  }

  private isTagValid(): boolean {
    const result = this.isFormsValid(this.tags);
    console.log('标签验证结果：' + result);
    return result;
  }

  private isRouterValid() {
    const result = this.isFormsValid(this.routers);
    console.log('路由验证结果：' + result);
    return result;
  }

  private isActionValid() {
    if (this.dataForm.value.messageTemplateType == 2) {
      if (this.actions.length > 0) {
        return true;
      } else {
        this.messageService.error('待办类型的消息必须设置操作');
        return false;
      }
    }
    return true;
  }

  private isFormsValid(formGroups: FormGroup[]) {
    if (!formGroups || formGroups.length == 0) {
      return true;
    }
    let flag = true;
    for (const formGroup of formGroups) {
      if (!formGroup.valid) {
        Object.values(formGroup.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({onlySelf: true});
          }
        });
        flag = false;
      }
    }
    return flag;
  }

  private getData(): any {
    const directRouters = [];
    const tags = [];

    if (this.routers && this.routers.length > 0) {
      for (const router of this.routers) {
        directRouters.push({...router.value})
      }
    }

    if (this.tags && this.tags.length > 0) {
      for (const tag of this.tags) {
        tags.push({...tag.value})
      }
    }

    const messageTemplate: any = {
      ...this.dataForm.value,
      messageTemplateGroupId: this.messageTemplateGroupId,
    }
    if (this.dataForm.value.messageTemplateType == 1) {
      messageTemplate['directRouters'] = directRouters;
    } else {
      messageTemplate['actions'] = this.actions;
      messageTemplate['tags'] = tags;

    }
    return messageTemplate
  }

}
