import { Injectable } from '@angular/core';
import { Position, PositionSearchForm, PositionUsersQueryDto, SimplePosition } from '@site/app/define/sys/position';
import { Observable } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { UserPageListVo } from '@site/app/define/sys/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from '@site/app/services/sys/user.service';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient, private userService: UserService) { }

  findByPage(formData: PositionSearchForm): Observable<ResponseBean<Position[]>> {
    return this.http.get<ResponseBean<Position[]>>('/api/position/page', {
      params: {
        ...formData
      }
    })
  }

  findAll(keyword?: string): Observable<ResponseBean<SimplePosition[]>> {
    return this.http.get<ResponseBean<SimplePosition[]>>('/api/position/findAll')
  }

  add(position: Position): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/position/add', position)
  }

  update(position: Position): Observable<ResponseBean<void>> {
    return this.http.put<ResponseBean<void>>('/api/position/update', position)
  }

  delete(positionId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/position/delete/${positionId}`)
  }

  toggleState(positionId: string, enable: boolean): Observable<ResponseBean<void>> {
    return this.http.patch<ResponseBean<void>>('/api/position/toggleState', {
      positionId,
      enable
    });
  }

  enable(positionId: string): Observable<ResponseBean<void>> {
    return this.http.patch<ResponseBean<void>>('/api/position/enable', {
      positionId,
      enable: true
    })
  }

  disable(positionId: string): Observable<ResponseBean<void>> {
    return this.http.patch<ResponseBean<void>>('/api/position/enable', {
      positionId,
      enable: false
    })
  }

  getDetails(positionId: string): Observable<ResponseBean<Position>> {
    return this.http.get<ResponseBean<Position>>(`/api/position/getDetails/${positionId}`);
  }

  getUsers(queryDto: PositionUsersQueryDto): Observable<ResponseBean<UserPageListVo[]>> {
    return this.userService.findByPage(queryDto);
  }

}
