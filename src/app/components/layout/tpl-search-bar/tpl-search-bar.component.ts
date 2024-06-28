import {
  booleanAttribute,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SearchBarHelpDirective } from '@site/app/components/layout/tpl-search-bar/search-bar-help.directive';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

export interface TplFormItem {
  name: string;
  label: string;
  item?: TemplateRef<any>;
}

@Component({
  selector: 'app-tpl-search-bar',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    NgTemplateOutlet,
    NzToolTipModule
  ],
  templateUrl: './tpl-search-bar.component.html',
  styleUrl: './tpl-search-bar.component.css'
})
export class TplSearchBarComponent implements OnInit {
  @Input('columnNum') columnNum: number = 3;
  @Input('formGroup') formGroup!: FormGroup;
  @Input('loading') loading = false;
  @Input('showHelp') showHelp = false;
  @Input('showReset') showReset = true;
  @Input({transform: booleanAttribute, alias: 'showBottomLine'}) showBottomLine = false;
  @Input('items') items!: TplFormItem[];
  @Input('buttonPosition') buttonPosition: 'BR' | 'R' = 'BR';

  @Output() onSearch = new EventEmitter<any>();
  @Input() buttons?: TemplateRef<any>;

  @ContentChild(SearchBarHelpDirective, { static: true, read: TemplateRef })
  searchBarHelpContentChild!: TemplateRef<any>;

  itemNum = 0;
  isShowCollapsed = false;
  isCollapsed = true;
  filteredItems!: TplFormItem[];

  constructor() {
  }

  search() {
    this.onSearch.emit(this.formGroup.value)
  }

  reset() {
    this.formGroup.reset()
  }


  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit(): void {
    this.filteredItems = this.items.filter(o => !!o.item);
    this.itemNum = this.filteredItems.length;
    this.isShowCollapsed = this.itemNum > (this.columnNum * 2)
  }

  getSearchFormClass() {
    return {'search-form': true,
      'single-line': (this.itemNum <= this.columnNum && this.buttonPosition == 'R' && this.showReset),
      'single-line-compact': (this.itemNum <= this.columnNum && this.buttonPosition == 'R' && !this.showReset),
      'search-form-bottom-right': this.buttonPosition == 'BR',
      'search-form-right': this.buttonPosition == 'R'}
  }

}
