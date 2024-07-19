import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { UserPageListVo } from '@site/app/define/sys/user';
import { SectionComponent } from '@site/app/components/layout/section/section.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PositionService } from '@site/app/services/sys/position.service';
import { Position } from '@site/app/define/sys/position';
import { RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {
  DetailsOperationBarComponent
} from '@site/app/components/layout/details-operation-bar/details-operation-bar.component';
import { PermIfDirective } from '@site/app/directives/perm-if.directive';

@Component({
  selector: 'app-position-details-manage',
  standalone: true,
  imports: [
    CommonModule,

    NzTableModule,
    NzDescriptionsModule,
    NzTableModule,
    NzButtonModule,
    NzSpinModule,
    NzSkeletonModule,

    SectionComponent,
    RouterLink,
    NzIconDirective,
    DetailsOperationBarComponent,
    PermIfDirective
  ],
  templateUrl: './position-details-manage.component.html',
  styleUrl: './position-details-manage.component.css'
})
export class PositionDetailsManageComponent implements OnInit {

  @Input('positionId') positionId: string = '';

  detailsLoading = false;
  position?: Position;

  users: UserPageListVo[] = [];
  userTableLoading = false;
  userTableOptions = {
    total: 0,
    page: 1,
    pageSize: 10
  };

  stateLoading = false;

  constructor(private positionService: PositionService, private messageService: NzMessageService) {
  }

  getDetails() {
    this.detailsLoading = true;
    this.positionService.getDetails(this.positionId).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.position = res.data;
        }
      },
      complete: () => this.detailsLoading = false
    });
  }

  loadUsers() {
    this.userTableLoading = true;
    this.positionService.getUsers({
      positionId: this.positionId,
      page: this.userTableOptions.page,
      pageSize: this.userTableOptions.pageSize
    }).subscribe({
      next: res => {
        if (res.success) {
          this.users = res.data || [];
          this.userTableOptions.total = res.total || 0;
        }
      },
      complete: () => this.userTableLoading = false
    });
  }

  enable() {
    this.stateLoading = true;

    this.positionService.enable(this.positionId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('已启用');
          if (this.position) {
            this.position.isEnable = true;
          }
        }
      },
      complete: () => this.stateLoading = false
    });
  }

  disable() {
    this.stateLoading = true;
    this.positionService.disable(this.positionId).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('已禁用');
          if (this.position) {
            this.position.isEnable = false;
          }
        }
      },
      complete: () => this.stateLoading = false
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.getDetails();
  }
}
