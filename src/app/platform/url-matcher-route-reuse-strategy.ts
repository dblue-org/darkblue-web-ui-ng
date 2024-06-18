import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class UrlMatcherRouteReuseStrategy implements RouteReuseStrategy {

  public static routeSnapshots: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const url = this.getFullPath(route);
    return route.routeConfig ? UrlMatcherRouteReuseStrategy.routeSnapshots[url] : null;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const url = this.getFullPath(route);
    return !!UrlMatcherRouteReuseStrategy.routeSnapshots[url];
  }


  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) === JSON.stringify(curr.params);
  }

  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    const url = this.getFullPath(route);
    if (url) {
      UrlMatcherRouteReuseStrategy.routeSnapshots[url] = detachedTree;
    }
  }

  private getFullPath(route: ActivatedRouteSnapshot): string {
    return this.getFullPaths(route).filter(Boolean).join('/');
  }

  private getFullPaths(route: ActivatedRouteSnapshot): string[] {
    const urls: string[] = [];
    let currentRoute: ActivatedRouteSnapshot | null = route;
    let i = 0;
    while (currentRoute && i < 100) {
      const routeUrls = currentRoute.url.map(segment => segment.path);
      urls.unshift(...routeUrls)
      currentRoute = currentRoute.parent;
      i++;
    }
    return urls;
  }

  private getRouterUrls(route: ActivatedRouteSnapshot): string[] {
    return route.url.map(urlSegment => urlSegment.path);
  }





}
