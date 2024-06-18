import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ActivatedRoute,
  ActivationEnd,
  NavigationEnd,
  NavigationStart,
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
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LogoutService } from '../../services/login/logout.service';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { MenuComponent } from './menu/menu.component';
import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import { MessagingComponent } from './messaging/messaging.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { MenuItem } from '../../define/menu';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    RouterLink,
    NzButtonModule,
    NzGridModule,
    NzAvatarModule,
    NzDropDownModule,
    NzDividerComponent,
    NzInputModule,
    MenuComponent,
    NzBadgeComponent,
    MessagingComponent,
    NzTabsModule,
    NgOptimizedImage
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
        const routerData = event.snapshot.routeConfig?.data;
        let tabTitle = "新标签页";
        if (routerData) {
          tabTitle = routerData['title'];
        }
        if (tabTitle && path) {
          this.addTab(tabTitle, path);
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
      const routerData = route.snapshot.routeConfig?.data;
      let tabTitle = routerData? routerData['title'] : "新标签页";
      if (tabTitle && path) {
        this.addTab(tabTitle, path);
      }
    }

  }

  showMessagingDrawer(): void {
    this.messagingDrawer?.open();
  }

  closeTab({ index }: { index: number }): void {
    this.selectedTabIndex = index - 1;
    const selectTab = this.tabs[this.selectedTabIndex];
    this.router.navigateByUrl(selectTab.routerLink).then(() => {
      this.tabs.splice(index, 1);
    })
  }

  addTab(title: string, url: string) {
    const exist = this.tabs.some((val) => val.routerLink == url);
    if (!exist) {
      this.tabs.push({
        name: title,
        routerLink: url,
        queryParams: {},
        closable: true
      })
    }
  }

}
