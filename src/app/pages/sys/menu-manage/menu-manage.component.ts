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
import { BasicTreeTable } from '@site/app/components/basic-tree-table';
import { BoxContainerComponent } from '@site/app/components/layout/box-container/box-container.component';

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
    FormsModule,
    BoxContainerComponent
  ],
  templateUrl: './menu-manage.component.html',
  styleUrl: './menu-manage.component.css'
})
export class MenuManageComponent extends BasicTreeTable<MenuItem> implements OnInit {

  listOfMapData: MenuItem[] = [];
  @ViewChild('menuAddModal') menuAddModal!: MenuAddModalComponent;
  loading = false;
  platform = 1;

  constructor(private menuService: MenuService) {
    super();
  }

  loadMenu(): void {
    this.loading = true;
    this.doLoadMenu().subscribe({
      next: res => {
        this.listOfMapData = res.data || [];
        this.mapOfExpandedData = {};
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

  getKeyName(): string {
    return 'menuId';
  }
}
