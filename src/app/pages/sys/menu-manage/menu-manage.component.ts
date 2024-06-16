import {Component, OnInit} from '@angular/core';
import {NzTableModule} from "ng-zorro-antd/table";
import {NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {MenuService} from "../../../services/menu/menu.service";
import {MenuItem} from "../../../define/menu";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {ToolbarComponent} from "../../../components/toolbar/toolbar.component";
import {NzGridModule} from "ng-zorro-antd/grid";

@Component({
  selector: 'app-menu-manage',
  standalone: true,
  imports: [
    NzTableModule,
    NgForOf,
    NgIf,
    NzButtonComponent,
    NzIconDirective,
    ToolbarComponent,
    NzGridModule
  ],
  templateUrl: './menu-manage.component.html',
  styleUrl: './menu-manage.component.css'
})
export class MenuManageComponent implements OnInit {
  listOfMapData: MenuItem[] = [];
  mapOfExpandedData: { [key: string]: MenuItem[] } = {};

  constructor(private menuService: MenuService) {
  }

  collapse(array: MenuItem[], data: MenuItem, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.menuId === d.menuId)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: MenuItem): MenuItem[] {
    const stack: MenuItem[] = [];
    const array: MenuItem[] = [];
    const hashMap = {};
    stack.push({...root, level: 0, expand: false});

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({...node.children[i], level: node.level! + 1, expand: false, parent: node});
        }
      }
    }

    return array;
  }

  visitNode(node: MenuItem, hashMap: { [key: string]: boolean }, array: MenuItem[]): void {
    if (!hashMap[node.menuId]) {
      hashMap[node.menuId] = true;
      array.push(node);
    }
  }

  loadMenu(): void {
    this.menuService.getUserMenu().subscribe(menus => {
      this.listOfMapData = menus;
      this.listOfMapData.forEach(item => {
        this.mapOfExpandedData[item.menuId] = this.convertTreeToList(item);
      });
    });
  }

  ngOnInit(): void {
    this.loadMenu();
  }
}
