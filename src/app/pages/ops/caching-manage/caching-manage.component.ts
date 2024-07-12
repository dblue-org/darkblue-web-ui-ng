import { Component, OnInit } from '@angular/core';
import { Caching } from '@site/app/define/ops/caching';
import { CachingService } from '@site/app/services/ops/caching.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '@site/app/components/layout/toolbar/toolbar.component';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-caching-manage',
  standalone: true,
  imports: [
    CommonModule,

    NzTableModule,
    NzButtonModule,
    ToolbarComponent,
    NzIconDirective
  ],
  templateUrl: './caching-manage.component.html',
  styleUrl: './caching-manage.component.css'
})
export class CachingManageComponent implements OnInit {

  cacheList: Caching[] = [];
  tableLoading = false;
  tableOptions = {
    total: 0,
    page: 1,
    pageSize: 15
  }

  refreshLoading = false;

  constructor(private cachingService: CachingService, private messageService: NzMessageService) {

  }

  loadCacheList() {
    this.tableLoading = true;
    this.cachingService.getCacheList().subscribe({
      next: res => {
        if (res.success) {
          this.cacheList = res.data || []
        }
      },
      complete: () => this.tableLoading = false
    })
  }

  ngOnInit(): void {
    this.loadCacheList();
  }

  refreshCache(cacheCode: string) {
    this.refreshLoading = true;
    this.cachingService.refreshCache(cacheCode).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('缓存已刷新');
          this.loadCacheList();
        }
      },
      complete: () => this.refreshLoading = false
    })
  }

}
