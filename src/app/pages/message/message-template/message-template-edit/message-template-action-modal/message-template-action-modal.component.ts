import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { MacroSelectComponent } from '@site/app/components/form/macro-select/macro-select.component';
import { MessageTemplateAction, MessageTemplateLink } from '@site/app/define/message/message-template';
import { IconifyComponent } from '@site/app/components/icon/iconify/iconify.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SectionComponent } from '@site/app/components/layout/section/section.component';
import { RouterTypeSelectComponent } from '@site/app/components/form/router-type-select/router-type-select.component';

@Component({
  selector: 'app-message-template-action-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    NzRadioModule,
    NzIconModule,

    MacroSelectComponent,
    IconifyComponent,
    SectionComponent,
    RouterTypeSelectComponent
  ],
  templateUrl: './message-template-action-modal.component.html',
  styleUrl: './message-template-action-modal.component.css'
})
export class MessageTemplateActionModalComponent {

  isVisible = false;
  isEdit = false;
  @Output() onCreateOk: EventEmitter<MessageTemplateAction> = new EventEmitter<MessageTemplateAction>();
  @Output() onEditOk: EventEmitter<MessageTemplateAction> = new EventEmitter<MessageTemplateAction>();

  dataForm = this.formBuilder.group({
    messageTemplateActionId: ['', [Validators.required]],
    actionName: ['', [Validators.required]],
    actionMark: [''],
    actionType: [1, Validators.required],
    matchState: [0, Validators.required],
    showConditional: [''],
    macroCode: ['']
  })

  routers: FormGroup[] = [
    this.formBuilder.group({
      routerType: [1, [Validators.required]],
      routerLink: ['', [Validators.required]],
    })
  ];

  constructor(private formBuilder: NonNullableFormBuilder, private messageService: NzMessageService) {
  }

  showAddModal() {
    this.dataForm.reset({});
    this.routers = [
      this.formBuilder.group({
        routerType: [1, [Validators.required]],
        routerLink: ['', [Validators.required]],
      })
    ];
    this.isVisible = true;
    this.isEdit = false;
  }

  showUpdateModal(data: MessageTemplateAction) {
    this.dataForm.reset({});
    this.routers = [];
    this.dataForm.patchValue(data);
    if (data.routes && data.routes.length > 0) {
      for (let link of data.routes) {
        const linkForm = this.formBuilder.group({
          routerType: [1, [Validators.required]],
          routerLink: ['', [Validators.required]],
        })
        linkForm.patchValue(link);
        this.routers.push(linkForm);
      }
    }
    this.isEdit = true;
    this.isVisible = true;
  }

  addRouter() {
    this.routers.push(this.formBuilder.group({
      routerType: [1, [Validators.required]],
      routerLink: ['', [Validators.required]],
    }))
  }

  removeRouter(index: number) {
    this.routers.splice(index, 1);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onSelectChange(value: number): void {
    if (value == 1) {
      if (this.routers.length == 0) {
        this.addRouter();
      }
    }
  }

  handleOk(): void {
    if (!this.isEdit) {
      this.dataForm.patchValue({
        messageTemplateActionId: Date.now() + ''
      })
    }
    if (this.dataForm.valid && this.routersValid()) {
      const action = {
        ...this.dataForm.value,
        routers: this.getLinks()
      }
      if (this.dataForm.value.actionType == 1) {
        action.macroCode = undefined
      }
      if (this.isEdit) {
        this.onEditOk.emit(action as MessageTemplateAction);
      } else {
        this.onCreateOk.emit(action as MessageTemplateAction);
      }

      this.isVisible = false;
    } else {
      Object.values(this.dataForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      if (this.dataForm.value.actionType == 1) {
        this.routers.forEach(routerForm => {
          Object.values(routerForm.controls).forEach(control => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({onlySelf: true});
            }
          });
        })
      }
    }
  }

  private routersValid(): boolean {
    if (this.dataForm.value.actionType == 2) {
      return true;
    }
    let flag = true;
    for (const router of this.routers) {
      flag = flag && router.valid
    }
    return flag;
  }

  private getLinks(): MessageTemplateLink[] {
    if (this.dataForm.value.actionType == 1 && this.routers.length > 0) {
      const links = []
      for (const router of this.routers) {
        links.push(router.value)
      }
      return links;
    } else {
      return [];
    }
  }

}
