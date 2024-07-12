import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BasicEditModalComponent } from '@site/app/components/basic-edit-modal/basic-edit-modal.component';
import { DictionaryService } from '@site/app/services/settings/dictionary.service';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dict-item-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzGridModule,
    NzFormModule
  ],
  templateUrl: './dict-item-edit-modal.component.html',
  styleUrl: './dict-item-edit-modal.component.css'
})
export class DictItemEditModalComponent extends BasicEditModalComponent {

  dataForm = this.formBuilder.group({
    dictionaryId: ['', [Validators.required]],
    dictionaryName: [''],
    dictionaryItemId: [''],
    parentId: [''],
    parentName: [''],
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    extension: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder, private dictionaryService: DictionaryService, private messageService: NzMessageService) {
    super();
  }

  protected override beforeAddShowProcessor(data?: any) {
    this.dataForm.patchValue(data);
  }

  protected override beforeUpdateShowProcessor(data: any) {
    this.dataForm.patchValue(data);
  }

  protected doSave(): Observable<ResponseBean<void>> {
    return this.dictionaryService.addDictionaryItem(this.dataForm.value as any);
  }

  protected doUpdate(): Observable<ResponseBean<void>> {
    return this.dictionaryService.updateDictionaryItem(this.dataForm.value as any);
  }

  getFormGroup(): FormGroup {
    return this.dataForm;
  }

  override onSaveSuccess() {
    this.messageService.success(this.isEdit ? '字典项修改成功' : '字典项添加成功');
  }
}
