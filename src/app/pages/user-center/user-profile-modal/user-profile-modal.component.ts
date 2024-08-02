import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { UserService } from '@site/app/services/sys/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-profile-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    NzModalModule,
    NzInputModule,
    NzGridModule,
    NzTabsModule,
    NzGridModule,
    NzListModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzSwitchModule
  ],
  templateUrl: './user-profile-modal.component.html',
  styleUrl: './user-profile-modal.component.css'
})
export class UserProfileModalComponent implements OnInit {

  isVisible = false;
  selectedIndex = 0;
  items = [
    '个人信息',
    '安全设置',
    '账号绑定',
    '消息通知'
  ];
  dataForm = this.formBuilder.group({
    userId: ['', [Validators.required]],
    username: [{value: '', disabled: true}],
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    deptName: [{value: '', disabled: true}],
    positionName: [{value: '', disabled: true}]
  });

  updateLoading = false;

  constructor(private formBuilder: NonNullableFormBuilder, private userService: UserService,
              private messageService: NzMessageService) {
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  onItemSelect(index: number) {
    this.selectedIndex = index;
  }

  ngOnInit(): void {
    this.userService.getMyselfInfo().subscribe(res => {
      if (res.success && res.data) {
        this.dataForm.patchValue(res.data);
      }
    });
  }

  updateUserInfo() {
    if (this.dataForm.valid) {
      this.updateLoading = true;
      this.userService.updateMyselfInfo(this.dataForm.value as any).subscribe({
        next: res => {
          if (res.success) {
            this.updateLoading = false;
            this.messageService.success('更新成功');
          }
        },
        complete: () => this.updateLoading = false
      });
    } else {
      Object.values(this.dataForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

}
