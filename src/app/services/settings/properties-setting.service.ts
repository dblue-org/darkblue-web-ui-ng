import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import { EnumItem, Property, PropertySearchForm, propertyType } from '@site/app/define/settings/property';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertiesSettingService {

  constructor(private http: HttpClient) { }

  getPropertyTypes(): Observable<ResponseBean<EnumItem[]>> {
    return of({
      success: true,
      data: propertyType
    })
  }

  getAllProperties(searchFrom: PropertySearchForm): Observable<ResponseBean<Property[]>> {
    return this.http.get<ResponseBean<Property[]>>('/api/property-setting/findByPage', {
      params: {
        ...searchFrom
      }
    })
  }

  add(property: Property): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/property-setting/add', property)
  }

  update(property: Property): Observable<ResponseBean<void>> {
    return this.http.put<ResponseBean<void>>('/api/property-setting/update', property)
  }

  delete(propertyId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/property-setting/update/${propertyId}`)
  }

  changePropertyValue(propertyId: string, value: any): Observable<ResponseBean<void>> {
    return this.http.patch<ResponseBean<void>>('/api/property-setting/changeValue', {
      propertyId, value
    })
  }
}
