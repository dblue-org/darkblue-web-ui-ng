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
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { MappingsService } from '@site/app/services/sys/mappings.service';

@Component({
  selector: 'app-resource-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzInputDirective,
    NzModalModule,
    NzGridModule,
    NzToolTipModule,
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

  resourceMappingLoading = false;

  constructor(private resourceService: ResourcesService, private formBuilder: NonNullableFormBuilder,
              private mappingService: MappingsService) {
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
    } as Resource
  }

  syncMappingInfo() {
    const requestMethod = this.dataForm.value.requestMethod;
    const resourceUrl = this.dataForm.value.resourceUrl;
    if (requestMethod && resourceUrl) {
      this.resourceMappingLoading = true;
      this.mappingService.getMapping(requestMethod, resourceUrl).subscribe({
        next: res => {
          if (res.success && res.data) {
            this.dataForm.patchValue({
              resourceName: res.data.resourceName,
              controller: res.data.controller,
              method: res.data.method
            });
          }
        },
        complete: () => this.resourceMappingLoading = false
      });
    }

  }

}
