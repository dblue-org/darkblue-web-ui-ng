import { Component } from '@angular/core';
import { BasicEditModalComponent } from '@site/app/components/basic-edit-modal/basic-edit-modal.component';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResourceGroup } from '@site/app/define/sys/resource';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ResourcesGroupService } from '@site/app/services/sys/resources-group.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-resource-group-edit-modal',
  standalone: true,
  imports: [
    FormsModule,
    NzGridModule,
    NzFormModule,
    NzInputDirective,
    NzModalModule,
    ReactiveFormsModule
  ],
  templateUrl: './resource-group-edit-modal.component.html',
  styleUrl: './resource-group-edit-modal.component.css'
})
export class ResourceGroupEditModalComponent extends BasicEditModalComponent {

  dataForm: FormGroup = this.formBuilder.group({
    resourceGroupId: [''],
    resourceGroupName: ['', [Validators.required]]
  });

  constructor(private formBuilder: NonNullableFormBuilder, private resourceGroupService: ResourcesGroupService,
              private messageService: NzMessageService) {
    super();
  }


  protected override beforeUpdateShowProcessor(data: ResourceGroup) {
    this.dataForm.patchValue(data);
  }

  protected doSave() {
    return this.resourceGroupService.add(this.dataForm.value);
  }

  protected doUpdate() {
    return this.resourceGroupService.add(this.dataForm.value);
  }

  getFormGroup(): FormGroup {
    return this.dataForm;
  }


  override onSaveSuccess() {
    this.messageService.success(this.isEdit ? '修改资源组成功' : '添加资源组成功');
  }
}
