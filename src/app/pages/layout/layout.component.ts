import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ActivatedRoute,
  ActivationEnd,
  Router,
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LogoutService } from '../../services/login/logout.service';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { MenuComponent } from './menu/menu.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { MessagingComponent } from './messaging/messaging.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

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

    MenuComponent,
    MessagingComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  showFooter = true;
  selectedTabIndex = 0;
  @ViewChild('messaging') messagingDrawer: MessagingComponent | undefined;
  tabs: any[] = [
    {
      name: '首页',
      routerLink: '/home',
      queryParams: {},
      closable: false
    }
  ]

  constructor(private logoutService: LogoutService, private authService: AuthenticationService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  logout() {
    this.logoutService.logout();
  }

  ngOnInit(): void {
    this.authService.ngOnInit();

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
    if (isActive) {
      this.selectedTabIndex = index - 1;
      const selectTab = this.tabs[this.selectedTabIndex];
      this.router.navigateByUrl(selectTab.routerLink).then(() => {
        this.tabs.splice(index, 1);
      })
    } else {
      this.tabs.splice(index, 1);
    }
  }

  addTab(title: string, url: string, params: any) {
    const existTab = this.tabs.find((val) => val.routerLink == url);
    if (!existTab) {
      this.tabs.push({
        name: title,
        routerLink: url,
        queryParams: {
          ...params
        },
        closable: true
      })
      this.selectedTabIndex = this.tabs.length - 1;
    } else {
      existTab.queryParams = params;
    }
  }

}
