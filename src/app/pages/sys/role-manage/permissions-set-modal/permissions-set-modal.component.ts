import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { RoleService } from '@site/app/services/sys/role.service';
import { NzTreeComponent, NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CommonModule } from '@angular/common';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuPermissionsComponent } from '@site/app/pages/sys/role-manage/menu-permissions/menu-permissions.component';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MenuPermissionsVo } from '@site/app/define/sys/menu';
import { bfs } from '@site/utils/nz-tree-node-utils';
import { environment } from '@site/environments/environment';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-permissions-set-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    NzStepsModule,
    NzModalModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzTreeModule,
    NzSkeletonModule,

    MenuPermissionsComponent,
  ],
  templateUrl: './permissions-set-modal.component.html',
  styleUrl: './permissions-set-modal.component.css'
})
export class PermissionsSetModalComponent {
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('menuPcTree') menuPcTree?: NzTreeComponent;
  @ViewChild('menuAppTree') menuAppTree?: NzTreeComponent;

  isVisible = false;
  isAllowAppMenu = environment.isAllowAppMenu;

  loading = false;
  pcMenus: NzTreeNodeOptions[] = [];
  appMenus: NzTreeNodeOptions[] = [];
  current = 0;
  pcMenuPermissions: MenuPermissionsVo[] = [];
  appMenuPermissions: MenuPermissionsVo[] = [];
  pcCheckedMenuIds: string[] = [];
  appCheckedMenuIds: string[] = [];
  menuLoading = false;
  nextLoading = false;
  roleId: string = '';
  selectedMenusIdList: string[] = []

  constructor(private roleService: RoleService, private messageService: NzMessageService) {
  }

  showModal(roleId: string) {
    this.roleId = roleId;
    this.reset();
    this.menuLoading = true;
    this.roleService.checkMenus(roleId).subscribe({
      next: res => {
        if (res.success && res.data) {
          this.pcCheckedMenuIds = this.roleService.getCheckedMenus(res.data.pcMenus);
          this.appCheckedMenuIds = this.roleService.getCheckedMenus(res.data.appMenus);
          this.pcMenus = this.roleService.toTreeNodes(res.data.pcMenus);
          this.appMenus = this.roleService.toTreeNodes(res.data.appMenus);
        }
      },
      complete: () => this.menuLoading = false
    })
    this.isVisible = true;
  }

  reset() {
    this.current = 0;
    this.pcMenus = [];
    this.appMenus = [];
    this.pcMenuPermissions = [];
    this.appMenuPermissions = [];
    this.pcCheckedMenuIds = [];
    this.appCheckedMenuIds = [];
    this.selectedMenusIdList = [];
  }

  pre() {
    this.current = this.current - 1;
  }

  next() {

    this.selectedMenusIdList = this.getCheckedMenus();
    if (this.current == 0) {
      this.nextLoading = true;
      this.current = this.current + 1;
      this.roleService.checkMenuPermissions(this.roleId, this.getCheckedMenus()).subscribe({
        next: res => {
          if (res.success && res.data) {
            this.pcMenuPermissions = res.data.filter(o => o.platform == 1);
            this.appMenuPermissions = res.data.filter(o => o.platform == 2);
          }
        },
        complete: () => this.nextLoading = false
      })
    } else {
      this.current = this.current + 1
    }
  }

  handleOk(): void {
    // this.isVisible = true;
    this.loading = true;

    const permissionIdList: string[] = [];

    this.pcMenuPermissions.flatMap(o => o.permissions).filter(o => o.checked).forEach(item => {
      permissionIdList.push(item.permissionId)
    })
    if (this.isAllowAppMenu) {
      this.appMenuPermissions.flatMap(o => o.permissions).filter(o => o.checked).forEach(item => {
        permissionIdList.push(item.permissionId);
      });
    }

    this.roleService.updatePermissions({
      roleId: this.roleId,
      menuIdList: this.selectedMenusIdList,
      permissionIdList
    }).subscribe({
      next: res => {
        if (res.success) {
          this.onSuccess.emit();
          this.isVisible = false;
          this.messageService.success('权限设置成功')
        }
      },
      complete: ()=> this.loading = false
    })
  }

  private getCheckedMenus(): string[]{
    const menuIdList: string[] = [];
    this.menuPcTree?.getCheckedNodeList().forEach(item => {
      menuIdList.push(item.key);
      if (item.children && item.children.length > 0) {
        bfs(item.children, (node) => {
          menuIdList.push(node.key)
        })
      }
    })
    this.menuPcTree?.getHalfCheckedNodeList().forEach(item => {
      menuIdList.push(item.key)
    })

    if (this.isAllowAppMenu) {
      this.menuAppTree?.getCheckedNodeList().forEach(item => {
        menuIdList.push(item.key);
        if (item.children && item.children.length > 0) {
          bfs(item.children, (node) => {
            menuIdList.push(node.key);
          });
        }
      });
      this.menuAppTree?.getHalfCheckedNodeList().forEach(item => {
        menuIdList.push(item.key);
      });
    }

    return menuIdList;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
