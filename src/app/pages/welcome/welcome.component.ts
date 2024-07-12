import { Component, OnInit } from '@angular/core';
import { DelonACLModule} from '@delon/acl';
import {PermIfDirective} from "../../directives/perm-if.directive";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [
    DelonACLModule,
    PermIfDirective,

    NzGridModule,
    NzStatisticModule,
    DecimalPipe
  ],
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
