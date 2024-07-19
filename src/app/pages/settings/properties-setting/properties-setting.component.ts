import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TplSearchBarComponent } from '@site/app/components/layout/tpl-search-bar/tpl-search-bar.component';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { EnumItem, getEnumLabel, getPropertyType, Property, toScopeString } from '@site/app/define/settings/property';
import { PropertiesSettingService } from '@site/app/services/settings/properties-setting.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {
  PropertyValueEditModalComponent
} from '@site/app/pages/settings/properties-setting/property-value-edit-modal/property-value-edit-modal.component';
import {
  PropertyEditModalComponent
} from '@site/app/pages/settings/properties-setting/property-edit-modal/property-edit-modal.component';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { BoxContainerComponent } from '@site/app/components/layout/box-container/box-container.component';
import { PermIfDirective } from '@site/app/directives/perm-if.directive';

@Component({
  selector: 'app-properties-setting',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzTableModule,
    NzButtonModule,
    NzGridModule,
    NzInputModule,
    NzToolTipModule,

    TplSearchBarComponent,
    NzIconDirective,
    PropertyValueEditModalComponent,
    PropertyEditModalComponent,
    NzPopconfirmDirective,
    BoxContainerComponent,
    PermIfDirective
  ],
  templateUrl: './properties-setting.component.html',
  styleUrl: './properties-setting.component.css'
})
export class PropertiesSettingComponent implements OnInit {

  @ViewChild('propertyEditModalComponent') propertyEditModalComponent?: PropertyEditModalComponent;
  @ViewChild('propertyValueEditModalComponent') propertyValueEditModalComponent?: PropertyValueEditModalComponent;

  searchForm = this.formBuilder.group({
    propertyCode: [''],
    propertyName: ['']
  });

  properties: Property[] = [];
  tableLoading = false;
  tableOptions = {
    total: 0,
    page: 1,
    pageSize: 15
  };
  getPropertyType = getPropertyType;
  toScopeString = toScopeString;
  deleteLoading = false;

  constructor(
    private formBuilder: NonNullableFormBuilder, private propertyService: PropertiesSettingService,
    private messageService: NzMessageService) {
  }

  search() {
    this.tableOptions.page = 1;
    this.loadProperties();
  }

  loadProperties() {
    this.tableLoading = true;
    this.propertyService.getAllProperties({
      ...this.searchForm.value,
      page: this.tableOptions.page,
      pageSize: this.tableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success) {
          this.tableOptions.total = res.total || 0;
          this.properties = res.data || [];
        }
        this.tableLoading = false;
      },
      error: () => this.tableLoading = false
    });
  }

  showValueEditModal(property: Property) {
    this.propertyValueEditModalComponent?.showModal(property);
  }

  ngOnInit(): void {
    this.loadProperties();
  }

  getEnumValue(value: any, property: Property): string {
    return value + '-' + getEnumLabel(value, property.valueScope as EnumItem[]);
  }

  showAddModal() {
    this.propertyEditModalComponent?.showAddModal();
  }

  showUpdateModal(property: Property) {
    this.propertyEditModalComponent?.showUpdateModal(property);
  }

  delete(propertyId?: string) {
    if (!propertyId) {
      return;
    }
    this.deleteLoading = true;
    this.propertyService.delete(propertyId).subscribe({
      next: res => {
        if (res.success) {
          this.loadProperties();
          this.messageService.success('参数已删除');
        }
        this.deleteLoading = false;
      },
      error: () => this.deleteLoading = false
    });
  }
}
