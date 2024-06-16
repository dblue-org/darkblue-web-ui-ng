import { Component, OnInit } from '@angular/core';
import { DelonACLModule} from '@delon/acl';
import {PermIfDirective} from "../../directives/perm-if.directive";

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [
    DelonACLModule,
    PermIfDirective
  ],
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
