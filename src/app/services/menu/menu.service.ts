import { Injectable } from '@angular/core';
import {Observable, of, from} from "rxjs";
import {MenuItem} from "../../define/menu";
import { ResponseBean } from '../../define/response';

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

  addMenu(menu: MenuItem): Observable<ResponseBean<any>> {
    return of({success: true})
  }

  updateMenu(menu: MenuItem): Observable<ResponseBean<any>> {
    return of({success: true})
  }

  deleteMenu(menuId: string): Observable<ResponseBean<any>> {
    return of({success: true})
  }
  enableMenu(menuId: string): Observable<ResponseBean<any>> {
    return of({success: true})
  }
  disabledMenu(menuId: string): Observable<ResponseBean<any>> {
    return of({success: true})
  }

  private mockMenu(): MenuItem[] {
    return [
      {
        menuId: '000000',
        menuName: '仪表盘',
        menuType: 1,
        level: 1,
        isEnable: true,
        menuIcon: 'dashboard',
        children: [
          {
            menuId: '00000001',
            menuName: '首页',
            menuType: 2,
            level: 2,
            isEnable: true,
            menuIcon: 'home',
            menuUrl: '/home'
          }
        ]
      },
      {
        menuId: '000001',
        menuName: '系统管理',
        menuType: 1,
        level: 1,
        isEnable: true,
        menuIcon: 'setting',
        menuUrl: '',
        children: [
          {
            menuId: '00000101',
            menuName: '用户管理',
            menuType: 2,
            level: 2,
            isEnable: true,
            menuIcon: 'user',
            menuUrl: '/sys/user'
          },
          {
            menuId: '00000102',
            menuName: '角色管理',
            menuType: 2,
            level: 2,
            isEnable: true,
            menuIcon: 'usergroup-add',
            menuUrl: '/sys/role'
          },
          {
            menuId: '00000103',
            menuName: '菜单管理',
            menuType: 2,
            level: 2,
            isEnable: true,
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
        isEnable: true,
        menuIcon: 'solution',
        menuUrl: '',
        children: [
          {
            menuId: '00000201',
            menuName: '登录日志',
            menuType: 2,
            level: 2,
            isEnable: true,
            menuIcon: 'login',
            menuUrl: ''
          },
          {
            menuId: '00000202',
            menuName: '操作日志',
            menuType: 2,
            level: 2,
            isEnable: true,
            menuIcon: 'edit',
            menuUrl: ''
          },
        ]
      }
    ]
  }

}
