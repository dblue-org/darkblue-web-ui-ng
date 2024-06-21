import { Routes } from '@angular/router';
import { PropertiesSettingComponent } from '@site/app/pages/settings/properties-setting/properties-setting.component';
import { DictManageComponent } from '@site/app/pages/settings/dict-manage/dict-manage.component';

export const SETTINGS_ROUTES: Routes = [
  { path: 'properties', component: PropertiesSettingComponent, data: {title: '配置参数管理'}, title: '配置参数管理'},
  { path: 'dict', component: DictManageComponent, data: {title: '字典管理'}, title: '字典管理'},
]
