import { Routes } from '@angular/router';
import { CachingManageComponent } from '@site/app/pages/ops/caching-manage/caching-manage.component';

export const OPS_ROUTES: Routes = [
  { path: 'caching', component: CachingManageComponent, data: {title: '缓存管理'}, title: '缓存管理'},
]
