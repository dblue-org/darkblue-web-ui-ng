import { Component } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { OperationLogService } from '@site/app/services/logs/operation-log.service';

@Component({
  selector: 'app-exception-modal',
  standalone: true,
  imports: [
    NzModalModule
  ],
  templateUrl: './exception-modal.component.html',
  styleUrl: './exception-modal.component.css'
})
export class ExceptionModalComponent {
  data?: string;
  isVisible = false;

  constructor(private operationLogService: OperationLogService) {
  }

  showModal(id: string) {
    this.operationLogService.getErrorDetails(id).subscribe(res => {
      if (res.success) {
        this.data = res.data || '';
      }
    })
    this.isVisible = true;
  }
}
