import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import {
  DictionaryAddDto, DictionaryItemAddDto,
  DictionaryItemListVo, DictionaryItemPageQueryDto, DictionaryItemUpdateDto,
  DictionaryListVo, DictionaryMixedVo
} from '@site/app/define/settings/dictionary';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private http: HttpClient) { }

  getDictionaryList(): Observable<ResponseBean<DictionaryListVo[]>> {
    return this.http.get<ResponseBean<DictionaryListVo[]>>('/api/dictionary/getAll');
  }

  addDictionary(data: DictionaryAddDto): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/dictionary/add', data)
  }

  updateDictionary(data: DictionaryAddDto): Observable<ResponseBean<void>> {
    return this.http.put<ResponseBean<void>>('/api/dictionary/update', data)
  }

  deleteDictionary(dictionaryId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/dictionary/delete/${dictionaryId}`)
  }

  getDictionaryItems(dictionaryType: number, queryDto: any): Observable<ResponseBean<DictionaryItemListVo[]>> {
    if (dictionaryType == 1) {
      return this.getDictionaryItemList(queryDto);
    } else {
      return this.getDictionaryItemTree(queryDto.dictionaryId);
    }
  }

  getDictionaryItemList(queryDto: DictionaryItemPageQueryDto): Observable<ResponseBean<DictionaryItemListVo[]>> {
    return this.http.get<ResponseBean<DictionaryItemListVo[]>>('/api/dictionary/page', {
      params: {
        ...queryDto
      }
    })
  }

  getDictionaryItemTree(dictionaryId: string): Observable<ResponseBean<DictionaryItemListVo[]>> {
    return this.http.get<ResponseBean<DictionaryItemListVo[]>>(`/api/dictionary/getItemTree/${dictionaryId}`);
  }

  addDictionaryItem(data: DictionaryItemAddDto): Observable<ResponseBean<void>> {
    return this.http.post<ResponseBean<void>>('/api/dictionary/addItem', data)
  }

  updateDictionaryItem(data: DictionaryItemUpdateDto): Observable<ResponseBean<void>> {
    return this.http.put<ResponseBean<void>>('/api/dictionary/updateItem', data)
  }

  deleteDictionaryItem(dictionaryItemId: string): Observable<ResponseBean<void>> {
    return this.http.delete<ResponseBean<void>>(`/api/dictionary/deleteItem/${dictionaryItemId}`)
  }

  toggleDictionaryItemState(dictionaryItemId: string, isEnable: boolean): Observable<ResponseBean<void>> {
    return this.http.patch<ResponseBean<void>>('/api/dictionary/enableItem', {
      dictionaryItemId,
      isEnable
    })
  }

  getDictForSelect(dictionaryCode: string): Observable<ResponseBean<DictionaryMixedVo>> {
    return this.http.get<ResponseBean<DictionaryMixedVo>>('/api/dictionary/getDictionaryForSelect', {
      params: {
        dictionaryCode
      }
    })
  }
}
