import { Injectable } from '@angular/core';
import { DetachedRouteHandle, Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteStoreService {

  private routeSnapshots: Map<Route, DetachedRouteHandle> = new Map();

  constructor() {
  }

  store(route: Route | null, detachedTree: DetachedRouteHandle): void {
    if (!route) {
      return;
    }
    this.routeSnapshots.set(route, detachedTree);
  }

  get(route: Route | null): DetachedRouteHandle | null {
    if (!route) {
      return null;
    }
    return this.routeSnapshots.get(route) || null;
  }

  has(route: Route | null): boolean {
    if (!route) {
      return false;
    }
    return this.routeSnapshots.has(route);
  }

  remove(route: Route | null): void {
    if (!route) {
      return;
    }
    this.routeSnapshots.delete(route);
  }

  removeByUrl(url: string, title: string): void {
    let removeKey: Route | null = null;
    this.routeSnapshots.forEach((value, key) => {
      if (key.path && key.title && url.endsWith(key.path) && title == key.title) {
        removeKey = key;
      }
    });

    // 延迟删除，如果删除的 tab 为当前页面，关闭tab会触发路由跳转，而路由跳转会触发保存页面的操作，会出现删除后又立即保存的情况。
    // 如用户管理页面为当前页面，【关闭用户管理页面】->【删除页面缓存】->【路由跳转】->【保存页面缓存】
    // 延迟的作用是将删除动作后移，即变为 【关闭用户管理页面】->【路由跳转】->【保存页面缓存】->【删除页面缓存】
    if (removeKey != null) {
      setTimeout(() => this.remove(removeKey), 300);
    }
  }

  clear(): void {
    this.routeSnapshots.clear();
  }
}
