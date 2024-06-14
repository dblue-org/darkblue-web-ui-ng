import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent } from 'ng-zorro-antd/form';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { LoginService } from '../../services/login/login.service';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { LoginForm } from '../../define/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzFormItemComponent,
    ReactiveFormsModule,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzColDirective,
    NzButtonComponent,
    NzInputDirective,
    NzFormDirective,
    NzRowDirective,
    NzCheckboxComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['admin', [Validators.required]],
    password: ['123456', [Validators.required]],
    remember: [true]
  });

  constructor(private fb: NonNullableFormBuilder, private loginService: LoginService, private authService: AuthenticationService) {
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.doLogin(this.validateForm.value as LoginForm);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  doLogin(data: LoginForm): void {
    this.loginService.login(data).subscribe(res => {
      if (res.success && res.data) {
        this.authService.saveUser(res.data);
      }
    })
  }

}
