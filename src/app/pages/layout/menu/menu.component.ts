import {Component, Input, OnInit} from '@angular/core';
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {RouterLink} from "@angular/router";
import {MenuItem} from "../../../define/menu";
import {MenuService} from "../../../services/menu/menu.service";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {NzIconModule} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NzMenuDirective,
    NzMenuItemComponent,
    NzSubMenuComponent,
    RouterLink,
    NgForOf,
    NgIf,
    NgTemplateOutlet,
    NzIconModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  @Input() isCollapsed = false;

  menuItems: MenuItem[] = [];

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.menuService.getUserMenu().subscribe(menus => {
      this.menuItems = menus;
    })
  }
}
