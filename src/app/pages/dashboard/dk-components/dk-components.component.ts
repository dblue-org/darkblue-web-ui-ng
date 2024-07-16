import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { DictionarySelectComponent } from '@site/app/components/form/dictionary-select/dictionary-select.component';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
// @ts-ignore
import _dictionarySelectDoc from '@docs/components/dictoinary-select.md';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-dk-components',
  standalone: true,
  imports: [
    CommonModule,

    NzGridModule,
    NzCardComponent,
    NzRadioModule,
    NzSwitchModule,

    DictionarySelectComponent,
    FormsModule,
    MarkdownComponent

  ],
  templateUrl: './dk-components.component.html',
  styleUrl: './dk-components.component.css'
})
export class DkComponentsComponent {

  listDictValue?: string;
  dictionarySelectDoc: string = _dictionarySelectDoc || '';
  dictionaryCode: string = 'TEST';
  isMultiple = false;
}
