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
import {
  ChangePasswordModalComponent
} from '@site/app/pages/user-center/change-password-modal/change-password-modal.component';

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
    ChangePasswordModalComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  @ViewChild('messaging') messagingDrawer?: MessagingComponent;
  @ViewChild('changePasswordModalComponent') changePasswordModalComponent?: ChangePasswordModalComponent;
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

  showChangePasswordModal() {
    this.changePasswordModalComponent?.showModal();
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
      this.doRemove(removeTabs);
    });
  }

  closeOthers() {
    const isNeedNavigate = this.selectedTabIndex != this.clickTabIndex;
    this.selectedTabIndex = this.clickTabIndex > 0 ? 1 : 0;
    const removeTabs = this.tabs.filter((_value, index) => index != 0 && index != this.clickTabIndex);
    this.tabs = this.tabs.filter((_value, index) => index == 0 || index == this.clickTabIndex);
    if (isNeedNavigate) {
      this.gotoSelectTabRoute().then(() => {
        this.doRemove(removeTabs);
      });
    } else {
      this.doRemove(removeTabs);
    }
  }

  closeLeft() {
    if (this.clickTabIndex > 1) {
      let isNeedNavigate = false;

      // 1. 点击的标签，在激活的标签之前：激活的标签没有被关闭，但是激活标签索引需要更新，不需要跳转
      // 2. 点击的标签，在激活的标签之后：激活的标签被关闭，更新激活索引为 1，需要跳转
      // 3. 点击的标签，就是激活的标签：更新激活索引为 1，不需要跳转

      if (this.clickTabIndex < this.selectedTabIndex) { // 没有关闭正在打开的页面。
        this.selectedTabIndex = this.selectedTabIndex - this.clickTabIndex + 1;
      } else if (this.clickTabIndex > this.selectedTabIndex) { // 点击的页面在打开的页面之后，关闭的时候正在打开的页面也被关闭了，这种情况需要跳转点击的页面
        isNeedNavigate = true;
        this.selectedTabIndex = 1;
      } else {
        this.selectedTabIndex = 1;
      }
      const removeTabs = this.tabs.splice(1, this.clickTabIndex - 1);
      if (isNeedNavigate) {
        this.gotoSelectTabRoute().then(() => {
          this.doRemove(removeTabs);
        });
      } else {
        this.doRemove(removeTabs);
      }
    }
  }

  closeRight() {
    if (this.tabs.length > 1 && this.clickTabIndex != (this.tabs.length - 1)) {
      // 1.活动页面在点击的页面之后：关闭页面并跳转，激活索引就是点击页面索引
      // 2.活动页面在点击的页面之前：激活索引不更新，不用跳转
      // 3.活动页面就是点击的页面：索引不更新，不用跳转

      let isNeedNavigate = false;
      if (this.clickTabIndex < this.selectedTabIndex) {
        isNeedNavigate = true;
        this.selectedTabIndex = this.clickTabIndex;
      }

      const removeTabs = this.tabs.splice(this.clickTabIndex + 1, this.tabs.length - 1);
      if (isNeedNavigate) {
        this.gotoSelectTabRoute().then(() => {
          this.doRemove(removeTabs);
        });
      } else {
        this.doRemove(removeTabs);
      }
    }
  }

  gotoSelectTabRoute(): Promise<boolean> {
    const selectTab = this.tabs[this.selectedTabIndex];
    return this.router.navigateByUrl(selectTab.routerLink);
  }

  private doRemove(removeTabs: RouterLinkTabItem[]) {
    this.tabsetStoreService.store(this.tabs);
    if (removeTabs.length > 0) {
      removeTabs.forEach(tab => {
        this.routeStoreService.removeByUrl(tab.routerLink, tab.name);
      });
    }
  }

}
