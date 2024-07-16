import { Injectable } from '@angular/core';
import { RouterLinkTabItem } from '@site/app/define/common';

@Injectable({
  providedIn: 'root'
})
export class TabsetStoreService {

  defaultTab: RouterLinkTabItem = {
    name: '首页',
    routerLink: '/home',
    queryParams: {},
    closeable: false
  }

  constructor() { }

  store(items: RouterLinkTabItem[]) {
    if (items && items.length > 0) {
      const json = JSON.stringify(items);
      sessionStorage.setItem('router-link-tabset-items', json)
    }

  }

  get(): RouterLinkTabItem[] {
    const json = sessionStorage.getItem('router-link-tabset-items');
    if (json) {
      return JSON.parse(json);
    }
    return [this.defaultTab];
  }

  clear() {
    sessionStorage.removeItem('router-link-tabset-items');
  }
}
