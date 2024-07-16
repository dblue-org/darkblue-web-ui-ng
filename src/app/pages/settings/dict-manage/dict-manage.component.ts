import { Component, ViewChild } from '@angular/core';
import { TwoColumnComponent } from '@site/app/components/layout/two-column/two-column.component';
import { TwoColumnSiderDirective } from '@site/app/components/layout/two-column/two-column-sider.directive';
import { DictListComponent } from '@site/app/pages/settings/dict-manage/dict-list/dict-list.component';
import { DictionaryItemListVo, DictionaryListVo } from '@site/app/define/settings/dictionary';
import { ToolbarComponent } from '@site/app/components/layout/toolbar/toolbar.component';
import { NzGridModule, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DictionaryService } from '@site/app/services/settings/dictionary.service';
import { TplSearchBarComponent } from '@site/app/components/layout/tpl-search-bar/tpl-search-bar.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { BasicTreeTable, BasicTreeTableItem } from '@site/app/components/basic-tree-table';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { MenuIconComponent } from '@site/app/components/icon/menu-icon/menu-icon.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SearchBarHelpDirective } from '@site/app/components/layout/tpl-search-bar/search-bar-help.directive';
import {
  DictItemEditModalComponent
} from '@site/app/pages/settings/dict-manage/dict-item-edit-modal/dict-item-edit-modal.component';
import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import { BoxContainerComponent } from '@site/app/components/layout/box-container/box-container.component';

@Component({
  selector: 'app-dict-manage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NzGridModule,
    NzButtonModule,
    NzTableModule,
    NzInputModule,
    NzInputNumberModule,

    TwoColumnComponent,
    TwoColumnSiderDirective,
    DictListComponent,
    ToolbarComponent,
    TplSearchBarComponent,
    NzIconDirective,
    NzPopconfirmDirective,
    MenuIconComponent,
    SearchBarHelpDirective,
    DictItemEditModalComponent,
    NzBadgeComponent,
    BoxContainerComponent
  ],
  templateUrl: './dict-manage.component.html',
  styleUrl: './dict-manage.component.css'
})
export class DictManageComponent extends BasicTreeTable<DictionaryItemListVo>{

  @ViewChild('dictItemEditModalComponent') dictItemEditModalComponent?: DictItemEditModalComponent;

  selectedDict?: DictionaryListVo;

  searchForm = this.formBuilder.group({
    code: [''],
    name: [''],
    extension: [''],
  })

  tableLoading = false;
  dictionaryItems: DictionaryItemListVo[] = [];
  tableOptions = {
    total: 0,
    page: 1,
    pageSize: 10
  }

  deleteLoading = false;
  stateLoading = false;

  constructor(
    private formBuilder: NonNullableFormBuilder, private dictionaryService: DictionaryService,
    private messageService: NzMessageService) {
    super();
  }

  onDictSelect(dict: DictionaryListVo) {
    this.selectedDict = dict;
    this.loadDictionaryItems();
  }

  search() {
    this.tableOptions.page = 1;
    this.loadDictionaryItems();
  }

  loadDictionaryItems() {
    if (!this.selectedDict) {
      return;
    }
    this.tableLoading = true;

    const queryDto: any = {
      dictionaryId: this.selectedDict.dictionaryId,
      ...this.searchForm.value,
      page: this.tableOptions.page,
      pageSize: this.tableOptions.pageSize
    }
    this.dictionaryService.getDictionaryItems(this.selectedDict.dictionaryType, queryDto).subscribe({
      next: res => {
        if (res.success) {
          this.dictionaryItems = res.data || [];
          this.tableOptions.total = this.dictionaryItems.length;
          if (this.selectedDict?.dictionaryType == 2) {
            this.clearExpandedData();
            this.dictionaryItems.forEach(item => {
              this.mapOfExpandedData[item.dictionaryItemId] = this.convertTreeToList(item);
            })
          }
        }
      },
      complete: () => this.tableLoading = false
    })
  }

  getKeyName(): string {
    return 'dictionaryItemId';
  }

  showAddModal() {
    this.dictItemEditModalComponent?.showAddModal({
      dictionaryId: this.selectedDict?.dictionaryId,
      dictionaryType: this.selectedDict?.dictionaryType,
      dictionaryName: this.selectedDict?.dictionaryName
    });
  }

  showAddSubItemModal(data: DictionaryItemListVo) {
    this.dictItemEditModalComponent?.showAddModal({
      dictionaryId: this.selectedDict?.dictionaryId,
      dictionaryType: this.selectedDict?.dictionaryType,
      dictionaryName: this.selectedDict?.dictionaryName,
      parentId: data.dictionaryItemId,
      parentName: data.name
    });
  }

  showUpdateModal(data: DictionaryItemListVo) {
    this.dictItemEditModalComponent?.showUpdateModal({
      dictionaryId: this.selectedDict?.dictionaryId,
      dictionaryType: this.selectedDict?.dictionaryType,
      dictionaryName: this.selectedDict?.dictionaryName,
      ...data
    });
  }

  delete(dictionaryItemId: string) {
    this.deleteLoading = true;
    this.dictionaryService.deleteDictionaryItem(dictionaryItemId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('字典项已删除');
          this.loadDictionaryItems();
        }
      },
      complete: () => this.deleteLoading = false
    })
  }

  toggleDictionaryItemState(data: DictionaryItemListVo, isEnable: boolean) {
    this.stateLoading = true;
    this.dictionaryService.toggleDictionaryItemState(data.dictionaryItemId, isEnable).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success(isEnable ? '字典项已启用' : '字典项已禁用');
          data.isEnable = isEnable
        }
      },
      complete: () => this.stateLoading = false
    })
  }

}
