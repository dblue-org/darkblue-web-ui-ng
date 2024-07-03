import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem, MenuItemDto } from '../../define/sys/menu';
import { ResponseBean } from '../../define/sys/response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getUserMenu(): Observable<ResponseBean<MenuItem[]>> {
    return this.findAllPcMenus();
  }

  getAllMenu(platform: number): Observable<ResponseBean<MenuItem[]>> {
    if (platform == 1) {
      return this.findAllPcMenus();
    } else {
      return this.findAllAppMenus();
    }
  }

  findAllPcMenus(): Observable<ResponseBean<MenuItem[]>> {
    return this.http.get<ResponseBean<MenuItem[]>>('/api/menu/findAllPcMenus');
  }

  findAllAppMenus(): Observable<ResponseBean<MenuItem[]>> {
    return this.http.get<ResponseBean<MenuItem[]>>('/api/menu/findAllAppMenus');
  }

  addMenu(menu: MenuItemDto): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/menu/add', menu)
  }

  updateMenu(menu: MenuItemDto): Observable<ResponseBean<any>> {
    return this.http.put<ResponseBean<void>>('/api/menu/update', menu)
  }

  deleteMenu(menuId: string): Observable<ResponseBean<any>> {
    return this.http.delete<ResponseBean<void>>(`/api/menu/delete/${menuId}`)
  }
  enableMenu(menuId: string): Observable<ResponseBean<any>> {
    return this.http.patch<ResponseBean<void>>('/api/menu/enable', {
      menuId,
      enable: true
    })
  }
  disabledMenu(menuId: string): Observable<ResponseBean<any>> {
    return this.http.patch<ResponseBean<void>>('/api/menu/enable', {
      menuId,
      enable: false
    })
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
            menuId: '00000106',
            menuName: '用户组管理',
            menuType: 2,
            level: 2,
            isEnable: true,
            menuIcon: 'iconify#mingcute:group-line',
            menuUrl: '/sys/user-group'
          },
          {
            menuId: '00000107',
            menuName: '职位管理',
            menuType: 2,
            level: 2,
            isEnable: true,
            menuIcon: 'iconify#healthicons:city-worker-outline',
            menuUrl: '/sys/position'
          },
          {
            menuId: '00000102',
            menuName: '角色管理',
            menuType: 2,
            level: 2,
            isEnable: true,
            menuIcon: 'iconify#carbon:user-role',
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
