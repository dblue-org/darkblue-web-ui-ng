import { Component } from '@angular/core';
import { SectionComponent } from '@site/app/components/layout/section/section.component';

@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [
    SectionComponent
  ],
  templateUrl: './role-details.component.html',
  styleUrl: './role-details.component.css'
})
export class RoleDetailsComponent {

}
