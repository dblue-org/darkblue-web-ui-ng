import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, ActivationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzContextMenuService, NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LogoutService } from '../../services/login/logout.service';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { MenuComponent } from './menu/menu.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { MessagingComponent } from './messaging/messaging.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { RouterLinkTabItem } from '@site/app/define/common';
import { TabsetStoreService } from '@site/app/services/common/tabset-store.service';
import { RouteStoreService } from '@site/app/services/common/route-store.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgOptimizedImage,
    RouterLink,

    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzGridModule,
    NzAvatarModule,
    NzDropDownModule,
    NzDividerModule,
    NzInputModule,
    NzTabsModule,
    NzBadgeModule,
    NzSpinModule,

    MenuComponent,
    MessagingComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  @ViewChild('messaging') messagingDrawer: MessagingComponent | undefined;
  isCollapsed = false;
  showFooter = true;
  selectedTabIndex = 0;
  tabs: RouterLinkTabItem[] = [
    {
      name: '首页',
      routerLink: '/home',
      queryParams: {},
      closeable: false
    }
  ]
  clickTabIndex: number = -1;
  isLogoutLoading = false;

  constructor(private logoutService: LogoutService, private authService: AuthenticationService,
              private router: Router, private activatedRoute: ActivatedRoute,
              private tabsetStoreService: TabsetStoreService, private contextMenuService: NzContextMenuService,
              private routeStoreService: RouteStoreService) {
  }

  logout() {
    this.isLogoutLoading = true;
    this.closeAll();
    this.logoutService.logout();
  }

  ngOnInit(): void {
    this.authService.ngOnInit();
    this.tabs = this.tabsetStoreService.get();

    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        const path = this.router.routerState.snapshot.url;
        const routerTitle = event.snapshot.routeConfig?.title as string;
        let tabTitle = routerTitle || "新标签页";
        if (tabTitle && path) {
          this.addTab(tabTitle, this.tripePath(path), event.snapshot.queryParams);
        }
      }
    })

    // first load
    const path = this.router.routerState.snapshot.url;
    if (path) {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      const routerTitle = route.snapshot.routeConfig?.title as string;
      let tabTitle = routerTitle || "新标签页";
      if (tabTitle && path) {
        this.addTab(tabTitle, this.tripePath(path), route.snapshot.queryParams);
      }
    }

  }

  private tripePath(path: string) {
    if (path.indexOf('?') > 0) {
      return path.substring(0, path.indexOf('?'))
    }
    return path;
  }

  showMessagingDrawer(): void {
    this.messagingDrawer?.open();
  }

  closeTab({ index }: { index: number }): void {
    const isActive = this.selectedTabIndex == index;
    const removedTab = this.tabs[index];
    if (isActive) {
      this.selectedTabIndex = index - 1;
      const selectTab = this.tabs[this.selectedTabIndex];
      this.router.navigateByUrl(selectTab.routerLink).then(() => {
        this.tabs.splice(index, 1);
        this.tabsetStoreService.store(this.tabs);
        this.routeStoreService.removeByUrl(removedTab.routerLink, removedTab.name);
      })
    } else {
      this.tabs.splice(index, 1);
      this.tabsetStoreService.store(this.tabs);
      this.routeStoreService.removeByUrl(removedTab.routerLink, removedTab.name);
    }
  }

  addTab(title: string, url: string, params: any) {
    if (url == '/login' || url == '/logout') {
      return;
    }
    const existTab = this.tabs.find((val) => val.routerLink == url);
    if (!existTab) {
      this.tabs.push({
        name: title,
        routerLink: url,
        queryParams: {
          ...params
        },
        closeable: true
      })
      this.selectedTabIndex = this.tabs.length - 1;
    } else {
      existTab.queryParams = params;
    }
    this.tabsetStoreService.store(this.tabs);
  }

  showTabContextMenu($event: MouseEvent, menu: NzDropdownMenuComponent, index: number) {
    $event.preventDefault();
    this.clickTabIndex = index;
    setTimeout(() => this.contextMenuService.create($event, menu), 50);
  }

  closeAll() {
    this.selectedTabIndex = 0;
    this.gotoSelectTabRoute().then(() => {
      const removeTabs = this.tabs.splice(1, this.tabs.length - 1);
      this.tabsetStoreService.store(this.tabs);
      if (removeTabs.length > 0) {
        removeTabs.forEach(tab => {
          this.routeStoreService.removeByUrl(tab.routerLink, tab.name);
        });
      }
    });
  }

  gotoSelectTabRoute(): Promise<boolean> {
    const selectTab = this.tabs[this.selectedTabIndex];
    return this.router.navigateByUrl(selectTab.routerLink);
  }

}
