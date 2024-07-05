import { Component, OnInit } from '@angular/core';
import { BasicEditModalComponent } from '@site/app/components/basic-edit-modal/basic-edit-modal.component';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PropertiesSettingService } from '@site/app/services/settings/properties-setting.service';
import { EnumItem, NumberScope, Property } from '@site/app/define/settings/property';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PropertyValueComponent } from '@site/app/components/form/property-value/property-value.component';
import { NumberScopeComponent } from '@site/app/components/form/number-scope/number-scope.component';
import { ListScopeComponent } from '@site/app/components/form/list-scope/list-scope.component';
import { EnumListScopeComponent } from '@site/app/components/form/enum-list-scope/enum-list-scope.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-property-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    NzModalModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,

    PropertyValueComponent,
    NumberScopeComponent,
    ListScopeComponent,
    EnumListScopeComponent
  ],
  templateUrl: './property-edit-modal.component.html',
  styleUrl: './property-edit-modal.component.css'
})
export class PropertyEditModalComponent extends BasicEditModalComponent implements OnInit {

  propertyTypes: EnumItem[] = [];

  dataForm = this.formBuilder.group({
    propertyCode: ['', [Validators.required]],
    propertyName: ['', [Validators.required]],
    remark: [''],
    type: [1, [Validators.required]],
    defaultValue: ['', [Validators.required]],
    unit: ['']
  })

  numberScope: NumberScope = {
    min: undefined,
    max: undefined
  }

  list: string[] = [];

  enumItems: EnumItem[] = [];

  constructor(
    private formBuilder: NonNullableFormBuilder, private propertyService: PropertiesSettingService,
    private messageService: NzMessageService) {
    super();
    // 当参数类型发生变更时，将默认值设置为空
    this.dataForm.controls.type.valueChanges.subscribe((event) => {
      this.dataForm.patchValue({
        defaultValue: undefined
      })
    })
  }

  protected override beforeAddShowProcessor(data?: any) {
    this.numberScope = {
      min: undefined,
      max: undefined
    };
    this.list = [];
    this.enumItems = [];
  }

  protected override beforeUpdateShowProcessor(data: any) {
    this.dataForm.patchValue(data);
    if (data.type == 2 && data.valueScope) {
      this.numberScope = {
        min: data.valueScope.min != undefined ? data.valueScope.min : -Infinity,
        max: data.valueScope.max != undefined ? data.valueScope.max : Infinity,
      };
    } else if (data.type == 7 && data.valueScope) {
      this.list = data.valueScope;
    } else if (data.type == 8 && data.valueScope) {
      this.enumItems = data.valueScope;
    }
  }

  protected doSave(): Observable<ResponseBean<void>> {
    return this.propertyService.add(this.getProperty());
  }

  protected doUpdate(): Observable<ResponseBean<void>> {
    return this.propertyService.update(this.getProperty());
  }

  getFormGroup(): FormGroup {
    return this.dataForm;
  }

  private getProperty(): Property {
    const property: any = {
      ...this.dataForm.value
    }
    if (!this.isEdit) {
      const type = this.dataForm.value.type;
      if (type == 2) {
        property['valueScope'] = {...this.numberScope}
      } else if (type == 7) {
        property['valueScope'] = {...this.list}
      } else if (type == 8) {
      property['valueScope'] = {...this.enumItems}
    }
    }
    return  property as Property;
  }

  protected readonly max = Infinity;

  ngOnInit(): void {
    this.propertyService.getPropertyTypes().subscribe(res => {
      if (res.success) {
        this.propertyTypes = res.data || []
      }
    })
  }

  override onSaveSuccess() {
    this.messageService.success(this.isEdit ? '参数已修改': '参数添加成功')
  }
}
