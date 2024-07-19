import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { DictionarySelectComponent } from '@site/app/components/form/dictionary-select/dictionary-select.component';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
// @ts-ignore
import _dictionarySelectDoc from '@docs/components/dictoinary-select.md';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { UserSelectComponent } from '@site/app/components/form/user-select/user-select.component';
import { DepartmentSelectComponent } from '@site/app/components/form/department-select/department-select.component';
import { PositionSelectComponent } from '@site/app/components/form/position-select/position-select.component';
import { SectionComponent } from '@site/app/components/layout/section/section.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { TplSearchBarComponent } from '@site/app/components/layout/tpl-search-bar/tpl-search-bar.component';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { SearchBarHelpDirective } from '@site/app/components/layout/tpl-search-bar/search-bar-help.directive';

@Component({
  selector: 'app-dk-components',
  standalone: true,
  imports: [
    CommonModule,

    NzGridModule,
    NzCardComponent,
    NzRadioModule,
    NzSwitchModule,
    NzButtonModule,

    DictionarySelectComponent,
    FormsModule,
    MarkdownComponent,
    UserSelectComponent,
    DepartmentSelectComponent,
    PositionSelectComponent,
    SectionComponent,
    NzInputDirective,
    NzOptionComponent,
    NzSelectComponent,
    ReactiveFormsModule,
    TplSearchBarComponent,
    NzIconDirective,
    SearchBarHelpDirective

  ],
  templateUrl: './dk-components.component.html',
  styleUrl: './dk-components.component.css'
})
export class DkComponentsComponent {

  listDictValue?: string;
  dictionarySelectDoc: string = _dictionarySelectDoc || '';
  dictionaryCode: string = 'TEST';
  isMultiple = false;

  userSelectMode: 'multiple' | 'tags' | 'default' = 'default';
  isDeptMultiple = false;
  positionSelectMode: 'multiple' | 'tags' | 'default' = 'default';
  sectionSize: 'large' | 'small' = 'small';

  searchForm: FormGroup = this.fb.group({
    name1: [''],
    name2: [''],
    name3: [''],
    name4: [''],
    name5: [''],
    name6: [''],
    name7: [''],
    name8: ['']
  });

  layout: 'R' | 'BR' = 'BR';
  lessThanSix = false;

  constructor(private fb: NonNullableFormBuilder) {
  }
}
