import { Injectable } from '@angular/core';
import {Observable, of, from} from "rxjs";
import {MenuItem} from "../../define/menu";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getUserMenu(): Observable<MenuItem[]> {
    const menus: MenuItem[] = this.mockMenu();
    return of(menus);
  }

  getAllMenu(): Observable<MenuItem[]> {
    const menus: MenuItem[] = this.mockMenu();
    return of(menus);
  }

  private mockMenu(): MenuItem[] {
    return [
      {
        menuId: '000000',
        menuName: '仪表盘',
        menuType: 2,
        level: 1,
        menuIcon: 'dashboard',
        menuUrl: '/welcome',
      },
      {
        menuId: '000001',
        menuName: '系统管理',
        menuType: 1,
        level: 1,
        menuIcon: 'setting',
        menuUrl: '',
        children: [
          {
            menuId: '00000101',
            menuName: '用户管理',
            menuType: 2,
            level: 2,
            menuIcon: 'user',
            menuUrl: '/sys/user'
          },
          {
            menuId: '00000102',
            menuName: '角色管理',
            menuType: 2,
            level: 2,
            menuIcon: 'usergroup-add',
            menuUrl: '/sys/role'
          },
          {
            menuId: '00000103',
            menuName: '菜单管理',
            menuType: 2,
            level: 2,
            menuIcon: 'bars',
            menuUrl: '/sys/menu',
          }
        ]
      },
      {
        menuId: '000002',
        menuName: '系统日志',
        menuType: 1,
        level: 1,
        menuIcon: 'solution',
        menuUrl: '',
        children: [
          {
            menuId: '00000201',
            menuName: '登录日志',
            menuType: 2,
            level: 2,
            menuIcon: 'login',
            menuUrl: ''
          },
          {
            menuId: '00000202',
            menuName: '操作日志',
            menuType: 2,
            level: 2,
            menuIcon: 'edit',
            menuUrl: ''
          },
        ]
      }
    ]
  }

}
