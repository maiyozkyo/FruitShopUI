import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchingValidatior } from './password.validator';
import { AuthService } from '../auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { NotifyService } from 'projects/shared/src/lib/services/notify.service';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  isLogin = true;
  constructor(
    private df: ChangeDetectorRef,
    private authService: AuthService,
    private tokenService: TokenService,
    private notiService: NotifyService,
    private router: Router
  ) {
    if (this.tokenService.isLoged()) {
      this.router.navigate(['/order']);
    }
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      password: new FormControl('', [Validators.required]),
    });

    this.registerForm = new FormGroup(
      {
        userName: new FormControl('', [
          Validators.required,
          Validators.maxLength(11),
        ]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: passwordMatchingValidatior }
    );
  }

  activeLoginForm() {
    this.isLogin = true;
  }
  login() {
    if (this.loginForm.valid) {
      let userName = this.loginForm.controls['userName'].value;
      let password = this.loginForm.controls['password'].value;
      this.authService.login(userName, password).subscribe((res: any) => {
        if (res) {
          this.tokenService.setAuth(res);
          this.router.navigate(['/order']);
          this.notiService.show(
            'Đăng nhập',
            'Đăng nhập thành công',
            'success',
            5000
          );
        }
      });
    } else {
      this.notiService.show(
        'Đăng nhập',
        'Vui lòng điền đầy đủ thông tin',
        'error',
        5000
      );
    }
  }

  activeRegisterForm() {
    this.isLogin = false;
  }
  register() {
    if (this.registerForm.valid) {
      let userName = this.registerForm.controls['userName'].value;
      let password = this.registerForm.controls['password'].value;
    }
  }
}
