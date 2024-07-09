import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgForOf, NgIf } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MenuService } from '../../../services/sys/menu.service';
import { MenuItem } from '../../../define/sys/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ToolbarComponent } from '@site/app/components/layout/toolbar/toolbar.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MenuAddModalComponent } from './menu-add-modal/menu-add-modal.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { MenuIconComponent } from '@site/app/components/icon/menu-icon/menu-icon.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';

@Component({
  selector: 'app-menu-manage',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,

    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzRadioModule,
    NzPopconfirmModule,

    ToolbarComponent,
    MenuIconComponent,
    MenuAddModalComponent,
    FormsModule
  ],
  templateUrl: './menu-manage.component.html',
  styleUrl: './menu-manage.component.css'
})
export class MenuManageComponent implements OnInit {
  listOfMapData: MenuItem[] = [];
  mapOfExpandedData: { [key: string]: MenuItem[] } = {};
  @ViewChild('menuAddModal') menuAddModal!: MenuAddModalComponent;
  loading = false;
  platform = 1;

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
    this.loading = true;
    this.doLoadMenu().subscribe({
      next: res => {
        this.listOfMapData = res.data || [];
        this.listOfMapData.forEach(item => {
          this.mapOfExpandedData[item.menuId] = this.convertTreeToList(item);
        });
      },
      complete: () => this.loading = false
    });
  }

  private doLoadMenu(): Observable<ResponseBean<MenuItem[]>> {
    if (this.platform == 1) {
      return this.menuService.findAllPcMenus();
    } else {
      return this.menuService.findAllAppMenus();
    }
  }

  showAddMenuModal(menu?: MenuItem) {
    if (menu) {
      this.menuAddModal.showAddModal(
        {
          parentId: menu.menuId,
          parentName: menu.menuName,
          platform: this.platform
        }
      );
    } else {
      this.menuAddModal.showAddModal(
        {
          parentId: '',
          parentName: '',
          platform: this.platform
        }
      );
    }
  }

  deleteMenu(menuId: string) {
    this.menuService.deleteMenu(menuId).subscribe(res => {
      if (res.success) {
        this.loadMenu();
      }
    });
  }

  enableMenu(menuId: string) {
    this.menuService.enableMenu(menuId).subscribe(res => {
      if (res.success) {
        this.loadMenu();
      }
    });
  }

  disabledMenu(menuId: string) {
    this.menuService.disabledMenu(menuId).subscribe(res => {
      if (res.success) {
        this.loadMenu();
      }
    });
  }

  showEditMenuModal(menu: MenuItem) {
    this.menuAddModal.showUpdateModal(menu);
  }

  ngOnInit(): void {
    this.loadMenu();
  }
}
