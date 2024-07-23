import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ResourceCheckVo } from '@site/app/define/sys/resource';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { PermIfDirective } from '@site/app/directives/perm-if.directive';
import { ResourcesService } from '@site/app/services/sys/resources.service';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-check-resource-modal',
  standalone: true,
  imports: [
    CommonModule,

    NzGridModule,
    NzModalModule,
    NzTableModule,
    NzButtonModule,
    NzSpinModule,
    NzPopconfirmDirective,
    NzTagComponent,
    NzResultModule,

    PermIfDirective

  ],
  templateUrl: './check-resource-modal.component.html',
  styleUrl: './check-resource-modal.component.css'
})
export class CheckResourceModalComponent {

  isVisible = false;
  loading = false;
  resources: ResourceCheckVo[] = [];
  private resourceService = inject(ResourcesService);

  showModal(platform: number) {
    this.isVisible = true;
    this.loading = true;
    this.resourceService.checkResource(platform).subscribe({
      next: res => {
        if (res.success) {
          this.resources = res.data || [];
        }
      },
      complete: () => this.loading = false
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isVisible = false;
  }
}
