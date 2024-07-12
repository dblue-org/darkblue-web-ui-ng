import { Component, EventEmitter, Output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnumItem, NumberScope, Property } from '@site/app/define/settings/property';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import moment from 'moment';
import { PropertyValueComponent } from '@site/app/components/form/property-value/property-value.component';
import { PropertiesSettingService } from '@site/app/services/settings/properties-setting.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-property-value-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    NzModalModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzInputNumberModule,
    NzSwitchModule,
    NzDatePickerModule,
    NzColorPickerModule,
    NzButtonModule,
    PropertyValueComponent
  ],
  templateUrl: './property-value-edit-modal.component.html',
  styleUrl: './property-value-edit-modal.component.css'
})
export class PropertyValueEditModalComponent {

  isVisible = false;
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  loading = false;
  value: any;
  property?: Property;
  min = -Infinity;
  max = Infinity;
  list: string[] = [];
  options: EnumItem[] = [];

  constructor(private propertySettingService: PropertiesSettingService, private messageService: NzMessageService) {
  }

  showModal(property: Property) {
    this.isVisible = true;
    this.property = property;
    this.setScope(property);
    this.value = property.value;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    if (this.property) {
      this.loading = true;
      this.propertySettingService.changePropertyValue(this.property?.propertyId, this.value).subscribe({
        next: res => {
          if (res.success) {
            this.messageService.success('参数值已更新');
            this.isVisible = false;
            this.onSuccess.emit({
              propertyId: this.property?.propertyId,
              value: this.value
            });
          }
          this.loading = false
        },
        error: () => this.loading = false
      })
    }
  }

  setScope(property: Property) {
    if (property.type == 2 && property.valueScope) {
      const scope = property.valueScope as NumberScope;
      this.min == scope.min != undefined ? scope.min : -Infinity;
      this.max == scope.max != undefined ? scope.max : Infinity;
    } else if (property.type == 7 && property.valueScope) {
      this.list = property.valueScope as string[];
    } else if (property.type == 8 && property.valueScope) {
      this.options = property.valueScope as EnumItem[];
    }
  }

  setToDefaultValue() {
    this.value = this.property?.defaultValue;
  }
}
