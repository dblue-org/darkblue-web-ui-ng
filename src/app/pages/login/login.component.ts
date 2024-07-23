import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { LoginService } from '../../services/login/login.service';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { LoginForm } from '../../define/sys/user';
import { environment } from '@site/environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  validateForm = this.fb.group({
    username: [environment.defaultLoginUser, [Validators.required]],
    password: [environment.defaultLoginPassword, [Validators.required]],
    remember: [true]
  });
  loginLoading = false;

  constructor(private fb: NonNullableFormBuilder, private loginService: LoginService, private authService: AuthenticationService) {
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.loginLoading = true;
      this.loginService.login(this.validateForm.value as LoginForm).subscribe({
        next: res => {
          this.loginLoading = false;
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }
}
