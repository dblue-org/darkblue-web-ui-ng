import { Component } from '@angular/core';
import { BasicEditModalComponent } from '@site/app/components/basic-edit-modal/basic-edit-modal.component';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResourcesService } from '@site/app/services/sys/resources.service';
import { Mapping, Resource } from '@site/app/define/sys/resource';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ResourceSelectComponent } from '@site/app/components/form/resource-select/resource-select.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { CommonModule } from '@angular/common';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';

@Component({
  selector: 'app-resource-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzInputDirective,
    NzModalModule,
    NzGridModule,
    ReactiveFormsModule,
    ResourceSelectComponent,
    NzSwitchModule,
    NzRadioComponent,
    NzRadioGroupComponent
  ],
  templateUrl: './resource-edit-modal.component.html',
  styleUrl: './resource-edit-modal.component.css'
})
export class ResourceEditModalComponent extends BasicEditModalComponent {

  selectedMapping?: Mapping;
  platform: number = 1;

  dataForm = this.formBuilder.group({
    resourceId: [''],
    resourceGroupId: [''],
    groupName: [''],
    platform: ['', [Validators.required]],
    resourceName: ['', [Validators.required]],
    resourceUrl: ['', [Validators.required]],
    requestMethod: ['', [Validators.required]],
    controller: ['', [Validators.required]],
    method: ['', [Validators.required]],
    isAuthedAccess: [false, [Validators.required]]
  })

  constructor(private resourceService: ResourcesService, private formBuilder: NonNullableFormBuilder) {
    super();
  }


  protected override beforeAddShowProcessor(data?: any) {
    this.dataForm.patchValue({
      ...data,
      isAuthedAccess: false
    })
    this.platform = data.platform || 1;
  }

  protected override beforeUpdateShowProcessor(data: any) {
    this.dataForm.patchValue(data);
    this.platform = data.platform || 1;
  }

  protected doSave(): Observable<ResponseBean<void>> {
    return this.resourceService.add(this.getFormData());
  }

  protected doUpdate(): Observable<ResponseBean<void>> {
    return this.resourceService.update(this.getFormData());
  }

  getFormGroup(): FormGroup {
    return this.dataForm;
  }

  onResourceSelect(resource: Mapping) {
    this.selectedMapping = resource;
    this.dataForm.patchValue(resource);
  }

  getFormData(): Resource {
    return {
      ...this.dataForm.value,
      //isAuthedAccess: this.dataForm.value.isAuthedAccess
    } as Resource
  }

}
