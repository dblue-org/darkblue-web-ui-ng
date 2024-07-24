import { Component, Input, OnInit } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterLink } from '@angular/router';
import { UserMenuVo } from '../../../define/sys/menu';
import { MenuService } from '../../../services/sys/menu.service';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuIconComponent } from '@site/app/components/icon/menu-icon/menu-icon.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,

    NzMenuModule,
    NzIconModule,
    NzSpinModule,

    MenuIconComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  @Input() isCollapsed = false;

  menuItems: UserMenuVo[] = [];
  loading = false;

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.menuService.getUserMenu().subscribe(res => {
      if (res.success) {
        this.menuItems = res.data || [];
        this.loading = false;
      }
    });
  }

}
