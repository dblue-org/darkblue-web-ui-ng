import { Injectable } from '@angular/core';
import { Observable, of, from, delay } from 'rxjs';
import {MenuItem} from "../../define/sys/menu";
import { ResponseBean } from '../../define/sys/response';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getUserMenu(): Observable<ResponseBean<MenuItem[]>> {
    return of({
      success: true,
      data: this.mockMenu()
    });
  }

  getAllMenu(): Observable<ResponseBean<MenuItem[]>> {
    return of({
      success: true,
      data: this.mockMenu()
    }).pipe(delay(300));
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
          },
          {
            menuId: '00000104',
            menuName: '权限管理',
            menuType: 2,
            level: 2,
            isEnable: true,
            menuIcon: 'safety',
            menuUrl: '/sys/permission',
          },
          {
            menuId: '00000105',
            menuName: '资源管理',
            menuType: 2,
            level: 2,
            isEnable: true,
            menuIcon: 'link',
            menuUrl: '/sys/resource',
          },
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
      },
      {
        menuId: '000003',
        menuName: '系统配置',
        menuType: 1,
        level: 1,
        isEnable: true,
        menuIcon: 'profile',
        menuUrl: '',
        children: [
          {
            menuId: '00000301',
            menuName: '配置参数管理',
            menuType: 2,
            level: 2,
            isEnable: true,
            menuIcon: 'login',
            menuUrl: '/setting/properties'
          },
          {
            menuId: '00000302',
            menuName: '字典管理',
            menuType: 2,
            level: 2,
            isEnable: true,
            menuIcon: 'edit',
            menuUrl: '/setting/dict'
          },
        ]
      },
      {
        menuId: '000004',
        menuName: '运维中心',
        menuType: 1,
        level: 1,
        isEnable: true,
        menuIcon: 'profile',
        menuUrl: '',
        children: [
          {
            menuId: '00000401',
            menuName: '缓存管理',
            menuType: 2,
            level: 2,
            isEnable: true,
            menuIcon: 'login',
            menuUrl: '/ops/caching'
          }
        ]
      }
    ]
  }

}
