import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { RoleService } from '@site/app/services/sys/role.service';
import { MenuPermissionsVo } from '@site/app/define/role';
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

@Component({
  selector: 'app-permissions-set-modal',
  standalone: true,
  imports: [
    CommonModule,
    NzStepsModule,
    NzModalModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzTreeModule,
    MenuPermissionsComponent,
    FormsModule
  ],
  templateUrl: './permissions-set-modal.component.html',
  styleUrl: './permissions-set-modal.component.css'
})
export class PermissionsSetModalComponent {
  isVisible = false;
  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('menuTree') menuTree?: NzTreeComponent;
  loading = false;
  menus: NzTreeNodeOptions[] = [];
  current = 0;
  menuPermissions: MenuPermissionsVo[] = [];
  checkedMenuIds: string[] = [];
  nextLoading = false;
  roleId: string = '';

  constructor(private roleService: RoleService, private messageService: NzMessageService) {
  }

  showModal(roleId: string) {
    this.roleId = roleId;
    this.menus = [];
    this.roleService.checkMenus(roleId).subscribe(res => {
      if (res.success) {
        this.menus = this.roleService.toTreeNodes(res.data);
        this.checkedMenuIds = this.roleService.getCheckedMenus(res.data || []);
      }
    })
    this.isVisible = true;
  }

  pre() {
    this.current = this.current - 1;
  }

  next() {
    this.nextLoading = true;
    if (this.current == 0) {
      this.roleService.checkMenuPermissions(this.roleId, this.getCheckedMenus()).subscribe({
        next: res => {
          if (res.success) {
            this.menuPermissions = res.data || [];
            this.current = this.current + 1
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
    const menuIdList: string[] = this.getCheckedMenus();

    const permissionIdList: string[] = [];
    this.menuPermissions.flatMap(o => o.permissions).filter(o => o.checked).forEach(item => {
      permissionIdList.push(item.permissionId)
    })

    this.roleService.updatePermissions({
      roleId: this.roleId,
      menuIdList,
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
    this.menuTree?.getCheckedNodeList().forEach(item => {
      menuIdList.push(item.key);
    })
    this.menuTree?.getHalfCheckedNodeList().forEach(item => {
      menuIdList.push(item.key)
    })
    return menuIdList;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
