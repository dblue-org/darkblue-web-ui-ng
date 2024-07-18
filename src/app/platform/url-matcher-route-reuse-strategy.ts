import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { inject } from '@angular/core';
import { RouteStoreService } from '@site/app/services/common/route-store.service';

export class UrlMatcherRouteReuseStrategy implements RouteReuseStrategy {

  private routeStoreService = inject(RouteStoreService);

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (!route.routeConfig || !route.data) {
      return false;
    }
    return route.data['shouldReuse'];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!this.routeStoreService.has(route.routeConfig)) return null;
    return this.routeStoreService.get(route.routeConfig);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.routeStoreService.get(route.routeConfig);
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) === JSON.stringify(curr.params);
  }

  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    if (!route.routeConfig) {
      return;
    }

    this.routeStoreService.store(route.routeConfig, detachedTree);
  }

}
