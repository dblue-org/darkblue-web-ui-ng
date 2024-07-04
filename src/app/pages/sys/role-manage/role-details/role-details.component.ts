import { Component, Input, OnInit } from '@angular/core';
import { SectionComponent } from '@site/app/components/layout/section/section.component';
import { CommonModule } from '@angular/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Role, RoleMenusWithPermission } from '@site/app/define/sys/role';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { RoleService } from '@site/app/services/sys/role.service';

@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [
    CommonModule,

    NzDescriptionsModule,
    NzTableModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    NzPopconfirmModule,

    SectionComponent,
  ],
  templateUrl: './role-details.component.html',
  styleUrl: './role-details.component.css'
})
export class RoleDetailsComponent implements OnInit{

  @Input('roleId') roleId?: string;
  rolePermissions: RoleMenusWithPermission[] = [];
  mapOfExpandedData: { [key: string]: RoleMenusWithPermission[] } = {};
  permissionTableLoading = false;

  role?: Role;

  constructor(private roleService: RoleService) {
  }

  collapse(array: RoleMenusWithPermission[], data: RoleMenusWithPermission, $event: boolean): void {
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

  convertTreeToList(root: RoleMenusWithPermission): RoleMenusWithPermission[] {
    const stack: RoleMenusWithPermission[] = [];
    const array: RoleMenusWithPermission[] = [];
    const hashMap = {};
    stack.push({...root, level: 0, expand: true});

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({...node.children[i], level: node.level! + 1, expand: true, parent: node});
        }
      }
    }

    return array;
  }

  visitNode(node: RoleMenusWithPermission, hashMap: { [key: string]: boolean }, array: RoleMenusWithPermission[]): void {
    if (!hashMap[node.menuId]) {
      hashMap[node.menuId] = true;
      array.push(node);
    }
  }

  loadRolePermissions(roleId: string): void {
    this.permissionTableLoading = true;
    this.roleService.getRoleMenusWithPermission('').subscribe({
      next: res => {
        this.rolePermissions = res.data || [];
        this.rolePermissions.forEach(item => {
          this.mapOfExpandedData[item.menuId] = this.convertTreeToList(item);
        });
      },
      complete: () => this.permissionTableLoading = false
    });
  }

  getRole() {
    if (this.roleId) {
      this.roleService.getRole(this.roleId).subscribe(res => {
        if (res.success) {
          this.role = res.data;
        }
      })
    }
  }

  ngOnInit(): void {
    if (this.roleId) {
      this.loadRolePermissions(this.roleId);
    }
  }
}
