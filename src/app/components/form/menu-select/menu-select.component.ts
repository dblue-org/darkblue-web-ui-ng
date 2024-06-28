import { booleanAttribute, Component, EventEmitter, forwardRef, Input, OnInit } from '@angular/core';
import { MenuService } from '@site/app/services/sys/menu.service';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { toNzTreeNodeOptions } from '@site/utils/nz-tree-node-utils';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

@Component({
  selector: 'app-menu-select',
  standalone: true,
  imports: [
    NzTreeSelectModule,
    FormsModule
  ],
  templateUrl: './menu-select.component.html',
  styleUrl: './menu-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MenuSelectComponent),
      multi: true
    }
  ]
})
export class MenuSelectComponent implements ControlValueAccessor, OnInit {

  @Input({transform: booleanAttribute}) onlyLeaf = false;
  @Input() mode: 'multiple' | 'tags' | 'default' = 'default';
  value?: string[] | string;
  isDisabled = false
  onChange = (value: any) => {
  };
  onTouched = () => {
  };
  menus: NzTreeNodeOptions[] = []

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.menuService.getAllMenu().subscribe(res => {
      if (res.success) {
        this.menus = toNzTreeNodeOptions(res.data || [], menu => {
          return {
            title: menu.menuName,
            key: menu.menuId,
            selectable: this.onlyLeaf ? menu.menuType == 2 : true
          }
        })
      }
    })
  }

  onModalValueChange(event: EventEmitter<any>) {
    this.onChange(this.value)
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

  writeValue(obj: any): void {
    this.value = obj;
  }


}
