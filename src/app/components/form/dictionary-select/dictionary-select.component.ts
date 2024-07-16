import { booleanAttribute, Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { DictionaryMixedVo } from '@site/app/define/settings/dictionary';
import { DictionaryService } from '@site/app/services/settings/dictionary.service';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CommonModule } from '@angular/common';
import { toNzTreeNodeOptions } from '@site/utils/nz-tree-node-utils';

@Component({
  selector: 'app-dictionary-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    NzSelectModule,
    NzTreeSelectModule
  ],
  templateUrl: './dictionary-select.component.html',
  styleUrl: './dictionary-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DictionarySelectComponent),
      multi: true
    }
  ]
})
export class DictionarySelectComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input({alias: 'dkDictionaryCode', required: true}) dictionaryCode: string = '';
  @Input({alias: 'dkDisabled', transform: booleanAttribute}) disabled = false;
  @Input({alias: 'dkMultiple', transform: booleanAttribute}) isMultiple: boolean = false;

  value?: string | string[];
  dictionary?: DictionaryMixedVo;
  nodes: NzTreeNodeOptions[] = [];

  onChange = (value: any) => {
  };
  onTouched = () => {
  };


  constructor(private dictionaryService: DictionaryService) {
  }

  ngOnInit(): void {
    //this.loadDictionaryInfo();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  onModalValueChange() {
    this.onChange(this.value);
  }

  loadDictionaryInfo() {
    this.dictionaryService.getDictForSelect(this.dictionaryCode).subscribe(res => {
      if (res.success && res.data) {
        this.dictionary = res.data;
        if (res.data.dictionaryType == 2) {
          this.nodes = toNzTreeNodeOptions(res.data.items, item => {
            return {
              title: item.name,
              key: item.code,
              isLeaf: item.children == null || item.children.length == 0
            };
          });
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dictionaryCode']) {
      this.loadDictionaryInfo();
    }
  }


}
