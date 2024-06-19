import {
  AfterContentInit,
  AfterViewInit,
  Component, contentChildren,
  ContentChildren, ElementRef, EventEmitter,
  Input, Output,
  QueryList, ViewChild,
  ViewChildren, ViewContainerRef
} from '@angular/core';
import { NzFormItemComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzColDirective, NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchFormItemComponent } from './search-form-item/search-form-item.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-search-bar',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './form-search-bar.component.html',
  styleUrl: './form-search-bar.component.css'
})
export class FormSearchBarComponent implements AfterViewInit,AfterContentInit {

  @Input('columnNum') columnNum: number = 3;
  @Input('formGroup') formGroup!: FormGroup;
  @ContentChildren(SearchFormItemComponent, {descendants: true }) colElements!: QueryList<SearchFormItemComponent>;
  @Output() onSearch = new EventEmitter<any>();
  itemNum = 0;
  isShowCollapsed = false;
  isCollapsed = true;

  search() {
    this.onSearch.emit(this.formGroup.value)
  }

  reset() {
    this.formGroup.reset()
  }

  ngAfterViewInit(): void {
  }

  ngAfterContentInit(): void {
    this.itemNum = this.colElements.length;
    this.isShowCollapsed = this.itemNum > (this.columnNum * 2)
    this.toggleFormItemVisibleState(this.isCollapsed)
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleFormItemVisibleState(this.isCollapsed)
  }

  private toggleFormItemVisibleState(collapsed: boolean) {
    this.colElements.forEach((item, index) => {
      if (index >= this.columnNum *2) {
        collapsed ? item.hide() : item.show();
      }
    })
  }
}
