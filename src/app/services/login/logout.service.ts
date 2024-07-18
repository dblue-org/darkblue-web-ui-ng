import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseBean } from '../../define/sys/response';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { RouteStoreService } from '@site/app/services/common/route-store.service';
import { TabsetStoreService } from '@site/app/services/common/tabset-store.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService,
              private routeStoreService: RouteStoreService, private tabsetStoreService: TabsetStoreService) {
  }

  logout() {
    this.http.get<ResponseBean<void>>('/api/logout').subscribe(res => {
      if (res.success) {
        this.authService.deleteSession();
        this.router.navigate(['/login']).then(() => {
          this.routeStoreService.clear();
          this.tabsetStoreService.clear();
        });
      }
    })
  }
}
