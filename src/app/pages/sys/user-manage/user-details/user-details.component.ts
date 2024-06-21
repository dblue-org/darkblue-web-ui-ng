import { Component } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgForOf } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { SectionComponent } from '@site/app/components/section/section.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    NzDescriptionsModule,
    NzTableModule,
    NgForOf,
    NzDividerModule,
    SectionComponent,
    NzButtonComponent,
    NzIconModule,
    NzTagModule,
    NzFlexModule
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {

  loginLogs: any[] = []
}
