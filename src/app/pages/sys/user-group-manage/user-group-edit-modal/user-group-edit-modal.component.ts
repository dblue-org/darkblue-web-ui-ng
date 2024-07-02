import { Component } from '@angular/core';
import { BasicEditModalComponent } from '@site/app/components/basic-edit-modal/basic-edit-modal.component';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserGroupService } from '@site/app/services/sys/user-group.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserGroup } from '@site/app/define/sys/user-group';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-group-edit-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzModalModule
  ],
  templateUrl: './user-group-edit-modal.component.html',
  styleUrl: './user-group-edit-modal.component.css'
})
export class UserGroupEditModalComponent extends BasicEditModalComponent {

  dataForm = this.formBuilder.group({
    userGroupId: [''],
    userGroupName: ['', Validators.required]
  });

  constructor(
    private formBuilder: NonNullableFormBuilder, private userGroupService: UserGroupService,
    private messageService: NzMessageService) {
    super();
  }


  protected override beforeUpdateShowProcessor(data: any) {
    this.dataForm.patchValue(data);
  }

  protected doSave(): Observable<ResponseBean<void>> {
    return this.userGroupService.add(this.dataForm.value as UserGroup);
  }

  protected doUpdate(): Observable<ResponseBean<void>> {
    return this.userGroupService.update(this.dataForm.value as UserGroup);
  }

  getFormGroup(): FormGroup {
    return this.dataForm;
  }


  override onSaveSuccess() {
    this.messageService.success(this.isEdit ? '用户组更新成功' : '用户组创建成功')
  }
}
