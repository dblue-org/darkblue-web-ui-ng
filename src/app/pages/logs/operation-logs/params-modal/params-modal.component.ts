import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SectionComponent } from '@site/app/components/layout/section/section.component';
import { OperationLog } from '@site/app/define/logs/operation-logs';
import { format } from 'prettier/standalone';
import prettierPluginBabel from 'prettier/plugins/babel';
import prettierPluginEstree from 'prettier/plugins/estree';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-params-modal',
  standalone: true,
  imports: [
    CommonModule,

    NzGridModule,
    NzModalModule,
    NzEmptyModule,

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
      this.in = JSON.stringify(jsonObj, null, 2);
    }

    if (log.result) {
      const jsonObj = JSON.parse(log.result);
      this.out = JSON.stringify(jsonObj, null, 2);
    }
  }
}
