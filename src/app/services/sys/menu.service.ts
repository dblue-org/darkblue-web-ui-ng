import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem, MenuItemDto, UserMenuVo } from '../../define/sys/menu';
import { ResponseBean } from '../../define/sys/response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getUserMenu(): Observable<ResponseBean<UserMenuVo[]>> {
    return this.http.get<ResponseBean<UserMenuVo[]>>('/api/user/getUserMenu/pc');
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
}
