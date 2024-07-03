import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../../../define/sys/menu';
import { MenuService } from '../../../services/sys/menu.service';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuIconComponent } from '@site/app/components/icon/menu-icon/menu-icon.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,

    NzMenuModule,
    NzIconModule,

    MenuIconComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  @Input() isCollapsed = false;
  @Output() onMenuItemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  menuItems: MenuItem[] = [];

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.menuService.getUserMenu().subscribe(res => {
      if (res.success) {
        this.menuItems = res.data || [];
      }
    });
  }

}
