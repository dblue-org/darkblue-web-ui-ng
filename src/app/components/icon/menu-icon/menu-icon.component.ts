import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { IconifyComponent } from '@site/app/components/icon/iconify/iconify.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-menu-icon',
  standalone: true,
  imports: [
    NgIf,
    IconifyComponent,
    NzIconModule
  ],
  templateUrl: './menu-icon.component.html',
  styleUrl: './menu-icon.component.css'
})
export class MenuIconComponent implements OnInit {
  @Input() icon?: string;

  isIconify = false;

  realIcon: string = '';

  ngOnInit(): void {
    this.isIconify = this.icon?.startsWith('iconify#') || false;
    if (this.isIconify) {
      this.realIcon = this.icon?.substring(8) || '';
    } else {
      this.realIcon = this.icon || '';
    }
  }


}
