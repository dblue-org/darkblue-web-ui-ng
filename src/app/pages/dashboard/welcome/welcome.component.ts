import { Component, OnInit } from '@angular/core';
import { DelonACLModule} from '@delon/acl';
import {PermIfDirective} from "../../../directives/perm-if.directive";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { BoxContainerComponent } from '@site/app/components/layout/box-container/box-container.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [
    CommonModule,
    DecimalPipe,

    DelonACLModule,
    PermIfDirective,

    NzGridModule,
    NzStatisticModule,
    NzCardModule,
    NzTableModule,
    NzButtonModule,
    NzAlertModule,

    NgxEchartsDirective,
    BoxContainerComponent
  ],
  styleUrls: ['./welcome.component.css'],
  providers: [
    provideEcharts()
  ]
})
export class WelcomeComponent implements OnInit {

  isAlertClose: boolean = false

  serviceData: any[] = [
    {
      serviceId: '123456',
      serviceCode: 'CDD-202406010010',
      serviceType: '采购订单',
      serviceDesc: '月度办公用品采购订单'
    },
    {
      serviceId: '123457',
      serviceCode: 'PDD-202406010010',
      serviceType: '销售订单',
      serviceDesc: '大客户打印机销售订单'
    },
    {
      serviceId: '123458',
      serviceCode: 'PDD-202406010011',
      serviceType: '销售订单',
      serviceDesc: '大客户打印机销售订单'
    },
    {
      serviceId: '123459',
      serviceCode: 'PDD-202406010012',
      serviceType: '销售订单',
      serviceDesc: '大客户打印机销售订单'
    },
    {
      serviceId: '123460',
      serviceCode: 'HT-202406010008',
      serviceType: '合同',
      serviceDesc: '供应链客户战略合作协议'
    }
  ]

  todoList: any[] = [
    {
      todoId: '0001',
      todoType: '审批',
      title: '合同审批',
      desc: '合同编码：HT-202406010010；合同名称：供应商合作协议',
      createTime: '2024-06-04 12:25:00'
    },
    {
      todoId: '0002',
      todoType: '审批',
      title: '合同审批',
      desc: '合同编码：HT-202406010010；合同名称：供应商合作协议',
      createTime: '2024-06-04 12:25:00'
    },
    {
      todoId: '0003',
      todoType: '审批',
      title: '合同审批',
      desc: '合同编码：HT-202406010010；合同名称：供应商合作协议',
      createTime: '2024-06-04 12:25:00'
    },
    {
      todoId: '0004',
      todoType: '审批',
      title: '合同审批',
      desc: '合同编码：HT-202406010010；合同名称：供应商合作协议',
      createTime: '2024-06-04 12:25:00'
    }
  ]
  option: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['2024-01', '2024-02', '2024-03', '204-04', '2024-05', '2024-06', '2024-07']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [8200, 9320, 9010, 9340, 12900, 13300, 13200],
        type: 'line',
        smooth: true
      }
    ]
  };
  constructor() { }

  ngOnInit() { }

}
