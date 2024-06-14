import { Component, OnInit } from '@angular/core';
import { ACLDirective, ACLIfDirective } from '@delon/acl';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [
    ACLIfDirective,
    ACLDirective
  ],
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
