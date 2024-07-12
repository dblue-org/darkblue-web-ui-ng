import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DictionaryListVo } from '@site/app/define/settings/dictionary';
import { DictionaryService } from '@site/app/services/settings/dictionary.service';
import { IconifyComponent } from '@site/app/components/icon/iconify/iconify.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { DictEditModalComponent } from '@site/app/pages/settings/dict-manage/dict-edit-modal/dict-edit-modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dict-list',
  standalone: true,
  imports: [
    CommonModule,

    NzListModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzSpinModule,
    NzSkeletonModule,

    IconifyComponent,
    DictEditModalComponent
  ],
  templateUrl: './dict-list.component.html',
  styleUrl: './dict-list.component.css'
})
export class DictListComponent implements OnInit {

  @Output() onSelect = new EventEmitter<DictionaryListVo>();
  @ViewChild('dictEditModalComponent') dictEditModalComponent?: DictEditModalComponent;

  loading = false;
  dictionaries: DictionaryListVo[] = [];
  selectedDict?: DictionaryListVo

  constructor(private dictionaryService: DictionaryService, private modalService: NzModalService,
              private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.loadDictionaries();
  }

  loadDictionaries() {
    this.dictionaries = [];
    this.loading = true;
    this.dictionaryService.getDictionaryList().subscribe({
      next: res => {
        if (res.success) {
          this.dictionaries = res.data || []
          if (!this.selectedDict) {
            this.select(this.dictionaries[0]);
          }
        }
      },
      complete: () => this.loading = false
    })
  }

  getDictionaryListItemClass(item: DictionaryListVo) {
    return {
      "dict-list-item": true,
      "dict-list-item-selected": this.selectedDict?.dictionaryId === item.dictionaryId
    }
  }

  select(dict: DictionaryListVo) {
    this.selectedDict = dict;
    this.onSelect.emit(dict);
  }

  showAddModal() {
    this.dictEditModalComponent?.showAddModal();
  }

  showUpdateModal(dict: DictionaryListVo) {
    this.dictEditModalComponent?.showUpdateModal(dict);
  }

  doDelete() {
    if (this.selectedDict && this.selectedDict.dictionaryId) {
      const dictionaryId = this.selectedDict.dictionaryId;
      this.modalService.confirm({
        nzTitle: '字典删除',
        nzContent: '是否确认删除此字典？删除字典的同时会同步删除字典项，此操作不可逆，请谨慎操作。',
        nzOnOk: () => {
          this.dictionaryService.deleteDictionary(dictionaryId).subscribe(res => {
            if (res.success) {
              this.messageService.success('字典已删除');
              this.loadDictionaries();
            }
          });
        }
      });
    }
  }

}
