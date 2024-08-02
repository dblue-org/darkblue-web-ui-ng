import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserService } from '@site/app/services/sys/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NzModalModule,
    NzInputModule,
    NzGridModule,
    NzFormModule,
    NzIconModule
  ],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.css'
})
export class ChangePasswordModalComponent {

  @Output() onSuccess: EventEmitter<void> = new EventEmitter<void>();

  isVisible = false;
  loading = false;

  dataForm = this.formBuilder.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]]
  });

  oldPasswordVisible = false;
  newPasswordVisible = false;


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
    this.loading = true;
    this.userService.changePassword(this.dataForm.value as any).subscribe({
      next: res => {
        if (res.success) {
          this.messageService.success('密码已修改！');
          this.isVisible = false;
          this.onSuccess.emit();
        }
      },
      complete: () => this.loading = false
    });
  }


}
