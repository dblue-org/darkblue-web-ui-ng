import { Component } from '@angular/core';
import { BasicEditModalComponent } from '@site/app/components/basic-edit-modal/basic-edit-modal.component';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DictionaryService } from '@site/app/services/settings/dictionary.service';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'app-dict-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NzModalModule,
    NzInputModule,
    NzRadioModule,
    NzGridModule,
    NzFormModule
  ],
  templateUrl: './dict-edit-modal.component.html',
  styleUrl: './dict-edit-modal.component.css'
})
export class DictEditModalComponent extends BasicEditModalComponent {

  dataForm = this.formBuilder.group({
    dictionaryId: [''],
    dictionaryCode: ['', [Validators.required]],
    dictionaryName: ['', [Validators.required]],
    dictionaryType: [1, [Validators.required]],
  })

  constructor(
    private formBuilder: NonNullableFormBuilder, private dictionaryService: DictionaryService,
    private messageService: NzMessageService) {
    super();
  }


  protected override beforeUpdateShowProcessor(data: any) {
    this.dataForm.patchValue(data);
  }

  protected doSave(): Observable<ResponseBean<void>> {
    return this.dictionaryService.addDictionary(this.dataForm.value as any);
  }

  protected doUpdate(): Observable<ResponseBean<void>> {
    return this.dictionaryService.updateDictionary(this.dataForm.value as any);
  }

  getFormGroup(): FormGroup {
    return this.dataForm;
  }


  override onSaveSuccess() {
    this.messageService.success(this.isEdit ? '字典更新成功' : '字典添加成功');
  }
}
