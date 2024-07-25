import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SectionComponent } from '@site/app/components/layout/section/section.component';
import { OperationLog } from '@site/app/define/logs/operation-logs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { MarkdownModule } from 'ngx-markdown';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-params-modal',
  standalone: true,
  imports: [
    CommonModule,

    NzGridModule,
    NzModalModule,
    NzEmptyModule,
    NzTabsModule,
    MarkdownModule,

    SectionComponent
  ],
  templateUrl: './params-modal.component.html',
  styleUrl: './params-modal.component.css'
})
export class ParamsModalComponent {
  data?: OperationLog;
  isVisible = false;
  in: any = undefined;
  out: any = undefined;

  showModal(log: OperationLog) {
    this.data = log;
    this.isVisible = true;
    this.in = undefined;
    this.out = undefined;

    if (log.methodParams) {
      const jsonObj = JSON.parse(log.methodParams);
      this.in = '```json\n' + JSON.stringify(jsonObj, null, 2) + '\n```';
    }

    if (log.result) {
      const jsonObj = JSON.parse(log.result);
      this.out = '```json\n' + JSON.stringify(jsonObj, null, 2) + '\n```';
    }
  }
}
