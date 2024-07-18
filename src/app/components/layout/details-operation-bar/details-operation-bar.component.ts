import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-details-operation-bar',
  standalone: true,
  imports: [
    CommonModule,

    NzGridModule,
    NzButtonModule,
    NzIconModule
  ],
  templateUrl: './details-operation-bar.component.html',
  styleUrl: './details-operation-bar.component.css'
})
export class DetailsOperationBarComponent {

  canGoBack: boolean = true;

  constructor(private location: Location) {
  }

  ngOnInit() {
    this.canGoBack = this.location.getState() !== null;
  }

  back() {
    this.location.back();
  }
}
