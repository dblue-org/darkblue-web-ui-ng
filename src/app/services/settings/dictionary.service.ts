import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ResponseBean } from '@site/app/define/sys/response';
import {
  DictionaryAddDto, DictionaryItemAddDto,
  DictionaryItemListVo, DictionaryItemPageQueryDto, DictionaryItemUpdateDto,
  DictionaryListVo, DictionaryMixedVo
} from '@site/app/define/settings/dictionary';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor() { }

  getDictionaryList(): Observable<ResponseBean<DictionaryListVo[]>> {
    return of({
      success: true,
      data: [
        {
          dictionaryId: '001',
          dictionaryName: '测试字典',
          dictionaryCode: 'test',
          dictionaryType: 1,
          createTime: '2021-01-01 00:00:00'
        },
        {
          dictionaryId: '002',
          dictionaryName: '测试树形字典',
          dictionaryCode: 'TEST2',
          dictionaryType: 2,
          createTime: '2021-01-01 00:00:00'
        }
      ]
    }).pipe(delay(300))
  }

  addDictionary(data: DictionaryAddDto): Observable<ResponseBean<void>> {
    return of({
      success: true,
    }).pipe(delay(1000))
  }

  updateDictionary(data: DictionaryAddDto): Observable<ResponseBean<void>> {
    return of({
      success: true,
    }).pipe(delay(1000))
  }

  deleteDictionary(dictionaryId: string): Observable<ResponseBean<void>> {
    return of({
      success: true,
    }).pipe(delay(1000))
  }

  getDictionaryItems(dictionaryType: number, queryDto: any): Observable<ResponseBean<DictionaryItemListVo[]>> {
    if (dictionaryType == 1) {
      return this.getDictionaryItemList(queryDto);
    } else {
      return this.getDictionaryItemTree(queryDto.dictionaryId);
    }
  }

  getDictionaryItemList(queryDto: DictionaryItemPageQueryDto): Observable<ResponseBean<DictionaryItemListVo[]>> {
    return of({
      success: true,
      data: [
        {
          dictionaryItemId: '001',
          code: 1,
          name: '测试字典1',
          extension: 'test1',
          parentId: '001',
          sortNum: 1,
          itemLevel: 1,
          isEnable: true,
          createTime: '2021-01-01 00:00:00'
        }
      ]
    }).pipe(delay(1000))
  }

  getDictionaryItemTree(dictionaryId: string): Observable<ResponseBean<DictionaryItemListVo[]>> {
    return of({
      success: true,
      data: [
        {
          dictionaryItemId: '001',
          code: 1,
          name: '测试字典1',
          extension: 'test1',
          parentId: '001',
          sortNum: 1,
          itemLevel: 1,
          isEnable: true,
          createTime: '2021-01-01 00:00:00',
          children: [
            {
              dictionaryItemId: '002',
              code: 2,
              name: '测试字典2',
              extension: 'test2',
              parentId: '001',
              sortNum: 2,
              itemLevel: 2,
              isEnable: true,
              createTime: '2021-01-01 00:00:00',
            }
          ]
        }
      ]
    }).pipe(delay(1000))
  }

  addDictionaryItem(data: DictionaryItemAddDto): Observable<ResponseBean<void>> {
    return of({
      success: true,
    }).pipe(delay(1000))
  }

  updateDictionaryItem(data: DictionaryItemUpdateDto): Observable<ResponseBean<void>> {
    return of({
      success: true,
    }).pipe(delay(1000))
  }

  deleteDictionaryItem(dictionaryItemId: string): Observable<ResponseBean<void>> {
    return of({
      success: true,
    }).pipe(delay(1000))
  }

  enableDictionaryItem(dictionaryItemId: string): Observable<ResponseBean<void>> {
    return of({
      success: true,
    }).pipe(delay(1000))
  }

  disableDictionaryItem(dictionaryItemId: string): Observable<ResponseBean<void>> {
    return of({
      success: true,
    }).pipe(delay(1000))
  }

  getDictForSelect(dictionaryId: string): Observable<ResponseBean<DictionaryMixedVo>> {
    return of({
      success: true,
      data: {
        dictionaryId: '001',
        dictionaryCode: 'test',
        dictionaryName: '测试字典',
        dictionaryType: 1,
        items: [
          {
            dictionaryItemId: '001',
            code: 1,
            name: '测试字典1',
          }
        ]
      }
    }).pipe(delay(1000))
  }
}
