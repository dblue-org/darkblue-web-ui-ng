import { Component, Input, TemplateRef } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { isTemplateRef } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [
    NzGridModule,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {
  @Input('dkTitle') title: string | TemplateRef<any> = '';
  @Input('dkExtra') extra?: TemplateRef<any>;
  @Input('dkBordered') bordered = false;
  @Input('dkSize') size: 'large' | 'small' = 'small';

  isTemplate(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }
  protected readonly isTemplateRef = isTemplateRef;
}
