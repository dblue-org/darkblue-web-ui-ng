import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzInputDirective, NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzRadioComponent, NzRadioModule } from "ng-zorro-antd/radio";
import { MacroSelectComponent } from "@site/app/components/form/macro-select/macro-select.component";
import { routePlatforms } from "@site/app/define/message/message-template";
import { IconifyComponent } from "@site/app/components/icon/iconify/iconify.component";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { SectionComponent } from "@site/app/components/layout/section/section.component";

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
    MacroSelectComponent,
    IconifyComponent,
    NzIconDirective,
    SectionComponent
  ],
  templateUrl: './message-template-action-modal.component.html',
  styleUrl: './message-template-action-modal.component.css'
})
export class MessageTemplateActionModalComponent {

  isVisible = false;
  isEdit = false;
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();

  dataForm = this.formBuilder.group({
    actionName: ['', [Validators.required]],
    actionMark: ['', Validators.required],
    actionType: [1, Validators.required],
    actionMatchState: [0, Validators.required],
    actionShowCondition: [''],
    macroCode: ['']
  })

  routers: FormGroup[] = [
    this.formBuilder.group({
      routeType: [1, [Validators.required]],
      routeLink: ['', [Validators.required]],
    })
  ];

  constructor(private formBuilder: NonNullableFormBuilder, private messageService: NzMessageService) {
  }

  showAddModal() {
    this.dataForm.reset({});
    this.isVisible = true;
    this.isEdit = false;
  }

  addRouter() {
    this.routers.push(this.formBuilder.group({
      routeType: [1, [Validators.required]],
      routeLink: ['', [Validators.required]],
    }))
  }

  removeRouter(index: number) {
    this.routers.splice(index, 1);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {

  }

  protected readonly messageRoutePlatforms = routePlatforms;
}
