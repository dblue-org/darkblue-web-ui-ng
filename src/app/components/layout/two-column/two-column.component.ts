import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { TwoColumnSiderDirective } from '@site/app/components/layout/two-column/two-column-sider.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-tow-column',
  standalone: true,
  imports: [
    NzLayoutModule,
    NgTemplateOutlet
  ],
  templateUrl: './two-column.component.html',
  styleUrl: './two-column.component.css'
})
export class TwoColumnComponent {
  @Input() sidebarWidth = 300;
  @Input() bordered = true;
  @ContentChild(TwoColumnSiderDirective, { static: true, read: TemplateRef })
  siderContentChild!: TemplateRef<any>;
  protected readonly window = window;
}
