import { Injectable } from '@angular/core';
import { RouterLinkTabItem } from '@site/app/define/common';

@Injectable({
  providedIn: 'root'
})
export class TabsetStoreService {

  private cacheKey = 'router-link-tabset-items';

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
      sessionStorage.setItem(this.cacheKey, json);
    }
  }

  get(): RouterLinkTabItem[] {
    const json = sessionStorage.getItem(this.cacheKey);
    if (json) {
      return JSON.parse(json);
    }
    return [this.defaultTab];
  }

  clear() {
    sessionStorage.clear();
  }
}
