import { Component, EventEmitter, forwardRef, Input, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SimpleUser } from '@site/app/define/user';
import { UserService } from '@site/app/services/sys/user.service';
import { BehaviorSubject, map, Observable, switchMap, debounceTime } from 'rxjs';

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [
    NgForOf,
    NzOptionComponent,
    NzSelectComponent,
    FormsModule
  ],
  templateUrl: './user-select.component.html',
  styleUrl: './user-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSelectComponent),
      multi: true
    }
  ]
})
export class UserSelectComponent implements ControlValueAccessor, OnInit {

  @Input('dkMode') mode: 'multiple' | 'tags' | 'default' = 'default';
  value?: string[] | string;
  options?: SimpleUser[] = [];
  isDisabled = false
  isLoading = false;
  searchChange$ = new BehaviorSubject('');
  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    const getUserList = (keyword: string): Observable<SimpleUser[]> => this.userService
      .searchUser(keyword).pipe(
        map(res => res.data || [])
      )

    const options$: Observable<SimpleUser[]> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(getUserList));

    options$.subscribe(data => {
      this.options = data;
      this.isLoading = false;
    })

  }

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }

  onModalValueChange(event: EventEmitter<any>) {
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = value;
  }
}
