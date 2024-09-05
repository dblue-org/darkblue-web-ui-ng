import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { GroupPermConfig } from "@site/app/define/common";
import { NzColDirective, NzGridModule, NzRowDirective } from "ng-zorro-antd/grid";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { PermIfDirective } from "@site/app/directives/perm-if.directive";
import { NgIf, NgTemplateOutlet } from "@angular/common";

@Component({
  selector: 'app-group-panel',
  standalone: true,
  imports: [
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    PermIfDirective,
    NgTemplateOutlet,
    NgIf
  ],
  templateUrl: './group-panel.component.html',
  styleUrl: './group-panel.component.css'
})
export class GroupPanelComponent {

  @Input('dkLoading') loading: boolean = false;
  @Input('dkIsSelected') isSelected: boolean = false;
  @Input('dkTitle') title: string = '';
  @Input('dkFooter') footer!: TemplateRef<any>;
  @Input('dkPermConfig') permConfig: GroupPermConfig = {
    add: '',
    update: '',
    delete: ''
  }
  @Output() onAdd: EventEmitter<void> = new EventEmitter<void>();
  @Output() onUpdate: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
  @Output() onReload: EventEmitter<void> = new EventEmitter<void>();

  onAddClick() {
    this.onAdd.emit()
  }
  onUpdateClick() {
    this.onUpdate.emit()
  }
  onDeleteClick() {
    this.onDelete.emit()
  }
  onReloadClick() {
    this.onReload.emit()
  }
}
