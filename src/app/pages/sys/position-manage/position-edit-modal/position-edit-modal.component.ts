import { Component } from '@angular/core';
import { BasicEditModalComponent } from '@site/app/components/basic-edit-modal/basic-edit-modal.component';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PositionService } from '@site/app/services/sys/position.service';
import { Position } from '@site/app/define/sys/position';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-position-edit-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    NzModalModule,
    NzFormModule,
    NzInputModule
  ],
  templateUrl: './position-edit-modal.component.html',
  styleUrl: './position-edit-modal.component.css'
})
export class PositionEditModalComponent extends BasicEditModalComponent {

  dataForm = this.formBuilder.group({
    positionId: [''],
    positionCode: ['', [Validators.required]],
    positionName: ['', [Validators.required]]
  })

  constructor(
    private formBuilder: NonNullableFormBuilder, private positionService: PositionService,
    private messageService: NzMessageService) {
    super();
  }
  protected doSave(): Observable<ResponseBean<void>> {
    return this.positionService.add(this.dataForm.value as Position);
  }

  protected doUpdate(): Observable<ResponseBean<void>> {
    return this.positionService.update(this.dataForm.value as Position);
  }

  getFormGroup(): FormGroup {
    return this.dataForm;
  }

  protected override beforeUpdateShowProcessor(data: any) {
    this.dataForm.patchValue(data)
  }


  override onSaveSuccess() {
    this.messageService.success(this.isEdit ? '职位更新成功' : '职位创建成功');
  }
}
