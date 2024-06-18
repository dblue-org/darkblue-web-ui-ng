import { Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Action } from '../messaging.component';

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './action.component.html',
  styleUrl: './action.component.css'
})
export class ActionComponent {
  @Input() action!: Action;
  @ViewChild('actionTemplate', { static: true }) actionTemplate!: TemplateRef<any>;
}
