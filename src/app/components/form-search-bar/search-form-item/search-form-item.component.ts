import { Component, HostBinding, Input } from '@angular/core';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-search-form-item',
  standalone: true,
  imports: [
    NzColDirective,
    NzFormModule,
    NgIf
  ],
  template: `
      <ng-content />
  `,
  styleUrl: './search-form-item.component.css'
})
export class SearchFormItemComponent {
  @HostBinding('style.display') display = 'block';

  show() {
    this.display = 'block';
  }

  hide() {
    this.display = 'none';
  }
}
