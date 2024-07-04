import { ActivatedRouteSnapshot, DetachedRouteHandle, Route, RouteReuseStrategy } from '@angular/router';

export class UrlMatcherRouteReuseStrategy implements RouteReuseStrategy {

  private routeSnapshots: Map<Route, DetachedRouteHandle> = new Map();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (!route.routeConfig || !route.data) {
      return false;
    }
    return route.data['shouldReuse'];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.routeConfig || !this.routeSnapshots.has(route.routeConfig)) return null;
    const handle = this.routeSnapshots.get(route.routeConfig);
    return handle ? handle : null;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.routeSnapshots.get(route.routeConfig);
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) === JSON.stringify(curr.params);
  }

  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    if (!route.routeConfig) {
      return;
    }

    this.routeSnapshots.set(route.routeConfig, detachedTree);
  }

}
